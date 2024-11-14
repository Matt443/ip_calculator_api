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
    const before = stringToChange.slice(0, startIndex);
    const after = stringToChange.slice(endIndex - 1);

    return before + replaceWith + after;
}
