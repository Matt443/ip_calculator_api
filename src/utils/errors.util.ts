/**
 * 
 * @param functionName  name of throwing function
 * @param requiredType required type to not throwing an error
 * @param typeofVar @default argument type of incorrect variable e.g argument, variable. Default: argument
 * @returns {string} - string with details of a type error
 */
export const typeErrorMessage = (requiredType: string, typeofVar: string = 'argument'):string => {
    return `${typeofVar} must be ${requiredType}`
}