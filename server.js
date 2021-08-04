const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const advertisements_url = "/advertisements";
const advertisements_file = "advertisements.json";

const categories_url = "/categories";
const categories_file = "categories.json";

const readFileData = (fileName, callback) => {
    fs.readFile(fileName, "utf8", (err, data) => {
        const arrayData = JSON.parse(data);
        callback(arrayData);
    });
};

const writeFileData = (fileName, arrayData, callback) => {
    fs.writeFile(fileName, JSON.stringify(arrayData), (err) => {
        callback(err);
    });
};

app.get(categories_url, (req, res) => {
    try {
        readFileData(categories_file, (arrayData) => {
            return res.send(arrayData);
        })
    } catch (error) {
        return res.status(500).send();
    }
});

app.get(advertisements_url, (req, res) => {
    const userId = req.get("userId");
    const { search, category, updatedOn } = req.query;

    try {
        readFileData(advertisements_file, (dataArray) => {
            const result = dataArray.filter(
                (item) =>
                    (!userId || item.createdByUserId === userId) &&
                    (!search || item.title.includes(search) || p.description.includes(search)) &&
                    (!category || p.category === category) &&
                    (!updatedOn || p.updatedOn.getDate() === updatedOn.getDate())
            );

            return res.send(result);
        });

    } catch (error) {
        return res.status(500).send();
    }
});

app.get(`${advertisements_url}/:id`, (req, res) => {
    const { id } = req.params;

    try {
        readFileData(advertisements_file, (arrayData) => {
            const advertisement = arrayData.find((item) => item.id === +id);
            return res.send(advertisement);
        });
    } catch (error) {
        return res.status(500).send();
    }
});

app.post(advertisements_url, (req, res) => {
    const userId = req.get("userId");
    const { title, description, category, image, createdByUserName } = req.body;

    if (!userId || !title || !description || !category || !createdByUserName)
        return res.status(500).send("Invalid model");

    try {
        readFileData(advertisements_file, (arrayData) => {
            const id = Math.max(...arrayData.map((p) => p.id)) + 1;
            const newAdvertisement = {
                id, title, description, category, image, createdByUserId: userId, createdByUserName, updatedOn: new Date().getTime()
            };
            writeFileData(advertisements_file, [...arrayData, newAdvertisement], (err) => {
                return res.send(!!err ? "Failed" : "Success");
            });
        });
    } catch (error) {
        return res.status(500).res.send();
    }
});

app.put(`${advertisements_url}/:id`, (req, res) => {
    const userId = req.get("userId");
    const { title, description, category, image, createdByUserName } = req.body;
    const { id } = req.params;

    try {
        readFileData(advertisements_file, (arrayData) => {
            const advertisementToUpdata = arrayData.find((item) => item.id === +id);

            if (!advertisementToUpdata)
                return res.send("Not Found!");

            if (advertisementToUpdata.createdByUserId !== userId)
                return res.send("Not Alowed!");

            advertisementToUpdata.title = title || advertisementToUpdata.title;
            advertisementToUpdata.description = description || advertisementToUpdata.description;
            advertisementToUpdata.category = category || advertisementToUpdata.category;
            advertisementToUpdata.image = image || advertisementToUpdata.image;
            advertisementToUpdata.createdByUserName = createdByUserName || advertisementToUpdata.createdByUserName;
            advertisementToUpdata.updatedOn = new Date().getTime();

            const updatedAdvertisements = arrayData.map(
                (item) => item.id === +id ? advertisementToUpdata : item
            );

            writeFileData(advertisements_file, updatedAdvertisements, (err) => {
                return res.status(!!err ? 500 : 200).send(!!err ? "Failed" : "Success");
            });
        });
    } catch (error) {
        return res.status(500).res.send();
    }
});

app.delete(`${advertisements_url}/:id`, (req, res) => {
    const userId = req.get("userId");
    const { id } = req.params;

    try {
        readFileData(advertisements_file, (arrayData) => {
            const advertisementToDelete = arrayData.find((item) => item.id === +id);

            if (!advertisementToDelete)
                return res.send("Not Found!");

            if (advertisementToDelete.createdByUserId !== userId)
                return res.send("Not Alowed!");

            const updatedAdvertisements = arrayData.filter((item) => item.id !== +id);

            writeFileData(advertisements_file, updatedAdvertisements, (err) => {
                return res.status(!!err ? 500 : 200).send(!!err ? "Failed" : "Success");
            });
        });
    } catch (error) {
        return res.status(500).res.send();
    }
});

app.listen(8080, () => {
    console.log("listen...");
});