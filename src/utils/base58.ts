import {base58xrp,} from '@scure/base';

export function stringToBase58(data: string): string {
    try {
        const enc = new TextEncoder()
        return base58xrp.encode(enc.encode(data))
    } catch (e) {
        throw new Error(`stringToBase58 encode error: ${data} : ${e}`);
    }
}
