import mongoose, { Schema } from 'mongoose';
import { IpClassType } from '../types/models.types.js';

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

export const IpClass = mongoose.model<IpClassType>('IpClass', IpMaskSchema);
