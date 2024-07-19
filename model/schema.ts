
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { IUser } from '../types/type';

const userSchema: MongooseSchema = new MongooseSchema({
    id_original: { type: Number, required: true },
    name_translation: { type: String, required: true },
    ParentId: { type: Number, required: true },
    LevelType: { type: Number, required: true },
    CityCode: { type: String, required: true },
    ZipCode: { type: Number, required: true },
    MergerName: { type: String },
    lng: { type: Number, required: true },
    Lat: { type: Number, required: true },
    name_original: { type: String, required: true },
    port_mapping: { type: String },
    border_mapping: { type: String },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
