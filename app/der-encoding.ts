import { DERElement } from "asn1-ts";

export function string(s: string) {
    const str = new DERElement(0, 0, 19);
    str.printableString = s;
    return str;
}

export function sequence<T extends DERElement>(arr: T[]) {
    const seq = new DERElement(0, 0, 16);
    seq.seq = arr;
    return seq;
}