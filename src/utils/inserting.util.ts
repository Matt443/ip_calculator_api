import { mongooseIdValidation } from '@/utils/validation.util.js';
import { IpAddressType } from '@/types/ip.types';
import mongoose from 'mongoose';
/**
 *
 * @param idsArray - array of strings with mongodb ids
 * @returns {IpAddressType} - array of ids
 */
export function createObjectIDs(idsArray: Array<string>): Array<mongoose.Types.ObjectId> {
    const resultTable: Array<mongoose.Types.ObjectId> = [];

    idsArray.every((id: string) => {
        if (mongooseIdValidation(id)) {
            resultTable.push(new mongoose.Types.ObjectId(id));
            return true;
        }
    });

    return resultTable;
}
