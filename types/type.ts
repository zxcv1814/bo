
import { Document } from 'mongoose';

export interface IUser extends Document {
    id_original: number;
    name_translation: string;
    ParentId: number;
    LevelType: number;
    CityCode: string;
    ZipCode: number;
    MergerName?: string;
    lng: number;
    Lat: number;
    name_original: string;
    port_mapping?: string;
    border_mapping?: string;
}
