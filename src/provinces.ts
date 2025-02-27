import *as  fs from 'fs';
import *as path from 'path';
import *as fastcsv from 'fast-csv';
import { MongoClient } from 'mongodb';

const uri: string = "mongodb+srv://dongquang:HWGxBa7ni6UVE6JY@provinces.mc0oyvt.mongodb.net/";
const dbName: string = 'provinces';

const mongoClient = new MongoClient(uri);

async function importCSVToMongoDB(): Promise<void> {
    const csvFilePath: string = path.join(__dirname, '../assets/provinces-china.csv');

    try {
        await mongoClient.connect();
        console.log("Kết nối thành công đến MongoDB");

        const db = mongoClient.db(dbName);
        const collection = db.collection('giftcards');
        let csvData: any[] = [];
        fs.createReadStream(csvFilePath)
            .pipe(fastcsv.parse({ headers: true }))
            .on('data', (row) => {
                const processedRow = {
                    "id_original": row.ID,
                    "name_translation": row.Name,
                    "name_original": row.山西,
                    "ParentId": row.ParentId,
                    "LevelType": parseInt(row.LevelType) || 0,
                    "CityCode": row.CityCode || 'CN',
                    "ZipCode": row.ZipCode || '',
                    "Lat": parseFloat(row.Lat),
                    "lng": parseFloat(row.lng),
                };

                csvData.push(processedRow);
            })
            .on('end', async () => {
                csvData.sort((a, b) => a.LevelType - b.LevelType);

                try {
                    const result = await collection.insertMany(csvData);
                    console.log(`Đã import ${result.insertedCount} bản ghi thành công`);
                } catch (error) {
                    console.error("Lỗi khi chèn dữ liệu:", error);
                } finally {
                    await mongoClient.close();
                    console.log("Đã đóng kết nối tới MongoDB");
                }
            })
            .on('error', (err) => {
                console.error('Lỗi khi đọc file CSV:', err);
            });
    } catch (error) {
        console.error("Lỗi khi kết nối tới MongoDB:", error);
    }
}

importCSVToMongoDB();
