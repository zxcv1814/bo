
import mongoose from 'mongoose';
import User from '../model/schema';

const uri: string = 'mongodb+srv://dongquang:HWGxBa7ni6UVE6JY@provinces.mc0oyvt.mongodb.net/';

async function main() {
    try {
        await mongoose.connect(uri);
        console.log('Kết nối thành công');

        const newUser = new User({
            id_original: 10000,
            name_translation: '中国',
            ParentId: 0,
            LevelType: 0,
            CityCode: 'CN',
            ZipCode: 54321,
            lng: 116.3683244,
            Lat: 39.915085,
            name_original: 'China',
        });

        await newUser.save();
        console.log('Lưu thành công');
    } catch (err) {
        console.error('Lỗi kết nối', err);
    } finally {
        await mongoose.connection.close();
    }
}

main();
