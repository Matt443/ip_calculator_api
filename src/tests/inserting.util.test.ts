import { createObjectIDs } from '@/utils/inserting.util.js';
import mongoose from 'mongoose';

const ids = ['672a1c8c0e303ffa0f62a361', '672a17dae666fbfc46c7d386', '672a17abaf5c260208c3dc6f'];

describe('Testing creating mongoose ids', () => {
    it('Should create object ids', () => {
        const objectIds = createObjectIDs(ids);

        expect(objectIds).toEqual([
            new mongoose.Types.ObjectId('672a1c8c0e303ffa0f62a361'),
            new mongoose.Types.ObjectId('672a17dae666fbfc46c7d386'),
            new mongoose.Types.ObjectId('672a17abaf5c260208c3dc6f')
        ]);
    });
    it('Should create object ids without one that is not a correct id', () => {
        ids[2] += '321';
        const objectIds = createObjectIDs(ids);

        expect(objectIds).toEqual([
            new mongoose.Types.ObjectId('672a1c8c0e303ffa0f62a361'),
            new mongoose.Types.ObjectId('672a17dae666fbfc46c7d386')
        ]);
    });
    it('Should return empty array because args is empty and not throw an error', () => {
        const objectIds = createObjectIDs([]);

        expect(objectIds).toEqual([]);
    });
});
