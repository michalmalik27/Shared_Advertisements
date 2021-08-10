const express = require("express");
const fs = require("fs");
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

const advertisements_url = "/api/advertisements";
const advertisements_file = "advertisements.json";

const categories_url = "/api/categories";
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
            let orderedData = arrayData.sort(function (a, b) {
                return a.localeCompare(b);
            })
            return res.send(arrayData);
        })
    } catch (error) {
        return res.status(500).send();
    }
});

app.get(advertisements_url, (req, res) => {
    const userId = req.get("userId");
    const { search, category, updatedOn, isOwn } = req.query;
    try {
        const _updatedOn = updatedOn ? new Date(updatedOn) : undefined;

        readFileData(advertisements_file, (dataArray) => {
            const result = dataArray
                .filter(
                    (item) =>
                        (isOwn !== 'true' || item.createdByUserId === userId) &&
                        (!search || item.title.includes(search) || item.description.includes(search)) &&
                        (!category || item.category === category) &&
                        /*TOFIX*/(!_updatedOn || new Date(item.updatedOn).setTime(_updatedOn.getTime()) === _updatedOn)
                ).map((item) => ({ ...item, createdByUserId: undefined, isEditEnable: item.createdByUserId === userId }));

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
            return res.send({ ...advertisement, createdByUserId: undefined });
        });
    } catch (error) {
        return res.status(500).send();
    }
});

app.post(advertisements_url, (req, res) => {
    const userId = req.get("userId");
    const { title, description, category, image, createdByUserName } = req.body;

    if (!userId || !title || !description || !category || !createdByUserName) {
        return res.status(500).send("Invalid model");
    }

    try {
        readFileData(advertisements_file, (arrayData) => {
            const id = Math.max(...arrayData.map((p) => p.id)) + 1;
            const newAdvertisement = {
                id, title, description, category, image, createdByUserId: userId, createdByUserName, updatedOn: new Date().getTime()
            };
            writeFileData(advertisements_file, [newAdvertisement, ...arrayData], (err) => {
                if (!err) return res.status(200).send({ ...newAdvertisement, isEditEnable: true });
                else throw err;
            });
        });
    } catch (error) {
        return res.status(500).send("An error occurred...");
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

            // to keep file-data ordered by updated on
            const updatedAdvertisements =
                [advertisementToUpdata, ...arrayData.filter((item) => item.id !== +id)];

            writeFileData(advertisements_file, updatedAdvertisements, (err) => {
                if (!err) return res.status(200).send({ ...advertisementToUpdata, isEditEnable: true });
                else throw err;
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
                if (!err) return res.status(200).send();
                else throw err;
            });
        });
    } catch (error) {
        return res.status(500).res.send();
    }
});

app.listen(8080, () => {
    console.log("listen...");
});