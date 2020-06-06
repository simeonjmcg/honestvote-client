import * as asn1js from "asn1js";

export function string(s: string) {
    if (isPrintable(s)) {
        return new asn1js.PrintableString({value: s});
    } else {
        return new asn1js.Utf8String({value: s});
    }
}

function isPrintable(s: string) {
    return /[a-zA-Z'()+,-.?:\/=]/.test(s);
}

export function sequence<T1 extends asn1js.LocalValueBlock, T2 extends asn1js.BaseBlock<T1>>(arr: T2[]) {
    return new asn1js.Sequence({
        value: arr,
    } as asn1js.BaseBlockParams);
}
export default asn1js;