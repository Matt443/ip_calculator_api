import mongoose, { Schema } from 'mongoose';
import { IpAddressType } from '../types/ip.types.js';

const IpAddressSchema = new Schema<IpAddressType>({
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
    }
});

export const IpAddress = mongoose.model<IpAddressType>('IpAddress', IpAddressSchema);
