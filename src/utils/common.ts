import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import { isInRange } from '@/utils/validation.util.js';
/**
 *
 * @param {string} stringToChange orginal string
 * @param {number} startIndex
 * @param {number} endIndex
 * @param {string} replaceWith string to be pasted between the indexes
 * @returns {string} new string with replaced part
 */

export function replaceInString(
    stringToChange: string,
    startIndex: number,
    endIndex: number,
    replaceWith: string
): string {
    if (
        !isInRange(startIndex, 0, stringToChange.length) ||
        !isInRange(endIndex - 1, 0, stringToChange.length) ||
        startIndex > endIndex
    )
        throw Error(ERROR_MESSAGES.validation.rangeIndex);
    const before = stringToChange.slice(0, startIndex);
    const after = stringToChange.slice(endIndex);

    return before + replaceWith + after;
}
