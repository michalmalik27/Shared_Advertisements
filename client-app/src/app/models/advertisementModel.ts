export interface AdvertisementModel {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    createdByUserName: string;
    updatedOn: Date;
    isEditEnable: boolean;
}