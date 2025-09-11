import {base58xrp, base58, base58flickr, base58xmr, createBase58check} from '@scure/base';
import {sha256} from "@noble/hashes/sha2";

export function stringToBase58(data: string, flavor: string): string {
    try {
        const enc = new TextEncoder()
        const dataBytes = enc.encode(data)
        switch (flavor) {
            case 'xrp':
                return base58xrp.encode(dataBytes)
            case 'xmr':
                return base58xmr.encode(dataBytes)
            case 'flickr':
                return base58flickr.encode(dataBytes)
            case 'check':
                const coder = createBase58check(sha256)
                return coder.encode(dataBytes)
        }
        return base58.encode(dataBytes)
    } catch (e) {
        throw new Error(`stringToBase58 encode error: ${data} : ${e}`);
    }
}
