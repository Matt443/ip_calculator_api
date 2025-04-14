import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';
const config: Config = {
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)\\.js$': '<rootDir>/src/$1.ts'
    },
    testEnvironment: 'node',
    preset: 'ts-jest/presets/default-esm',
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['ts', 'js'],
    coverageProvider: 'v8'
};

export default config;
