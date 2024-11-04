import mongoose, { Schema } from 'mongoose';
import { IpClassType } from '../types/ip.types.js';

const IpMaskSchema = new Schema<IpClassType>({
    ipMin: {
        type: Schema.Types.ObjectId,
        ref: 'IpAdress',
        required: true
    },
    ipMax: {
        type: Schema.Types.ObjectId,
        ref: 'IpAdress',
        required: true
    },
    className: {
        type: String,
        required: true,
        unique: true
    }
});

export const IpMask = mongoose.model<IpClassType>('IpMask', IpMaskSchema);
