import { IpFormatType } from '@/types/ip.types.js';

/**
 *
 * @param {{ip:string, type:IpFormatType}} query
 * @returns {{ip:string, type:IpFormatType}}
 */

export function ipQueryExtractor(query: { ip: string; type: IpFormatType }): {
    ip: string;
    type: IpFormatType;
} {
    let type: IpFormatType = 'default';
    if (query.type !== undefined) type = query.type as IpFormatType;
    const ip = query.ip as string;
    return { ip, type };
}
