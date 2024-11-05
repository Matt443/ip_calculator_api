import mongoose, { Schema } from 'mongoose';
import { type IpMaskType } from '../types/ip.types.js';

const IpMaskSchema = new Schema<IpMaskType>({
    firstOctet: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    secondOctet: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    thirdOctet: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    fourthOctet: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    shorthand: {
        type: Number, 
        required: true,
        min: 0,
        max: 32
    }
});

export const IpMask = mongoose.model<IpMaskType>('IpMask', IpMaskSchema);
