import mongoose from 'mongoose';

const uri: string = "mongodb+srv://dongquang:HWGxBa7ni6UVE6JY@provinces_china.mc0oyvt.mongodb.net/";

async function connect(): Promise<void> {
    try {
        await mongoose.connect(uri);
        console.log("Kết nối với MongoDB thành công");
    } catch (error) {
        console.error("Lỗi kết nối với MongoDB:", error);
        throw error;
    }
}

async function disconnect(): Promise<void> {
    try {
        await mongoose.disconnect();
        console.log("Ngắt kết nối với MongoDB thành công");
    } catch (error) {
        console.error("Lỗi ngắt kết nối với MongoDB:", error);
    }
}

export { connect, disconnect };
