// Type definitions for elliptic 6.5.2
// Project: https://github.com/indutny/elliptic
// Definitions by: Simeon McGraw <https://github.com/SimeonJMcG>

import BN from 'bn.js';
import hash from 'hash.js';

/*~ Different presets for elliptic keys
 */
export type CurvePreset = 
      'secp256k1'
    | 'p192'
    | 'p224'
    | 'p256'
    | 'p384'
    | 'p521'
    | 'curve25519'
    | 'ed25519';
export type Message = string | number[] | ArrayBuffer | Uint8Array;
declare class EDDSA {
    curve: BaseCurve;
    g: BasePoint;
    pointClass: SPoint | EPoint | MPoint | JPoint;
    encodingLength: number;
    hash: Hash;
    constructor(curve: 'ed25519');
    sign(message: Message, secret: Message | EDDSAKeyPair): EDDSASignature;
    verify(message: Message, sig: EDDSASignature | Message | EDDSASignatureParams, pub: Message | BasePoint | EDDSAKeyPair): boolean;
    hashInt(): BN;
    keyFromPublic(pub: Message | BasePoint): EDDSAKeyPair;
    keyFromSecret(secret: Message): EDDSAKeyPair;
    makeSignature(sig: Message | EDDSASignatureParams): EDDSASignature;
    encodePoint(point: BasePoint): Message;
    decodePoint(bytes: Message): BasePoint;
    encodeInt(num: BN): Message;
    decodeInt(bytes: Message): BN;
    isPoint(val: Object): boolean;
}
export { EDDSA as eddsa };

export interface EDDSAKeyPairParams {
    secret?: Message;
    pub?: Message | BasePoint;
}

export declare class EDDSAKeyPair {
    eddsa: EDDSA;
    constructor(eddsa: EDDSA, params: EDDSAKeyPairParams);
    static fromPub(eddsa: EDDSA, pub: Message | BasePoint): EDDSAKeyPair;
    static fromSecret(eddsa: EDDSA, secret: Message): EDDSAKeyPair;
    secret(): Message;
    pubBytes(): Message;
    pub(): BasePoint;
    privBytes(): Message;
    priv(): BN;
    hash(): string;
    messagePrefix(): string;
    sign(message: Message): EDDSASignature;
    verify(message: Message, sig: EDDSASignature): boolean;
    getSecret(enc?: Encoding): string;
    getPublic(enc?: Encoding): string;
}
export interface EDDSASignatureParams {
    R: BasePoint;
    S: BN;
    Rencoded: Message;
}

export declare class EDDSASignature {
    eddsa: EDDSA;
    constructor(eddsa: EDDSA, sig: Message | EDDSASignatureParams);
    S(): BN;
    R(): BasePoint;
    Rencoded(): Message;
    Sencoded(): Message;
    toBytes(): Message;
    toHex(): string;
}

export interface SignOptions {
    pers?: Message;
    persEnc?: Encoding;
    k?: unknown;
    canonical?: boolean;
}

declare class EC {
    curve: BaseCurve;
    n: BN;
    nh: BN;
    g: BasePoint;
    hash: Hash;
    constructor(preset: CurvePreset);
    keyPair(options?: ECKeyPairOptions): ECKeyPair;
    keyFromPrivate(priv: Point, enc?: Encoding): ECKeyPair;
    keyFromPublic(pub: Point, enc?: Encoding): ECKeyPair;
    genKeyPair(options?: HmacDRBGOptions): ECKeyPair;
    sign(msg: Message, key: BasePoint, enc?: Encoding, options?: SignOptions): ECSignature;
    sign(msg: Message, key: BasePoint, options?: SignOptions): ECSignature;
    verify(msg: Message, signature: ECSignature, key: BasePoint, enc?: Encoding): boolean;
    recoverPubKey(msg: Message, signature: ECSignature, j: number, enc?: Encoding): BasePoint;
    getKeyRecoveryParam(e: Message, signature: ECSignature, Q: BN, enc?: Encoding): number;
}
export { EC as ec };

export interface HmacDRBGOptions {
    hash?: Hash;
    predResist?: boolean;
    minEntropy?: number;
    entropy?: Message;
    entropyEnc?: Encoding;
    nonce?: Message;
    nonceEnc?: Encoding;
    pers?: Message;
    persEnc?: Encoding;
}

export interface ECKeyPairOptions {
    priv?: BasePoint;
    privEnc?: Encoding;
    pub?: BasePoint;
    pubEnc?: Encoding;
}

export type Encoding = 'hex' | 'utf8' | number;
export type ValidationReason = 'Invalid public key'
                             | 'Public key is not a point'
                             | 'Public key * N != O';
export interface ValidationResult {
    result: boolean;
    reason: ValidationReason;
}

export type Hash = typeof hash.hmac
                 | typeof hash.ripemd
                 | typeof hash.ripemd160
                 | typeof hash.sha
                 | typeof hash.sha224
                 | typeof hash.sha256
                 | typeof hash.sha384
                 | typeof hash.sha512;

export declare class ECKeyPair {
    ec: EC;
    priv: BasePoint | null;
    pub: BasePoint | null;
    constructor(ec: EC, options?: ECKeyPairOptions);
    static fromPublic(ec: EC, pub: Point, enc?: Encoding): ECKeyPair;
    static fromPrivate(ec: EC, priv: Point, enc?: Encoding): ECKeyPair;
    validate(): ValidationResult;
    getPublic(compact: boolean, enc: 'hex'): string;
    getPublic(compact?: boolean, enc?: Encoding): BasePoint;
    getPublic(enc: 'hex'): string;
    getPublic(enc?: Encoding): Point;
    getPrivate(enc: 'hex'): string;
    getPrivate(enc?: Encoding): BasePoint;
    derive(pub: Point): BasePoint;
    sign(msg: Message, enc?: Encoding, options?: ECKeyPairOptions): ECSignature;
    verify(msg: Message, signature: ECSignature): boolean;
    inspect(): String;
}

export interface ECSignatureOptions {
    r: BN | string | number;
    s: BN | string | number;
    recoveryParam?: number | null;
}

export declare class ECSignature {
    r: BN;
    s: BN;
    constructor(options: ECSignatureOptions, enc?: Encoding);
    toDER(enc?: 'hex'): string;
    toDER(enc?: Encoding): Buffer;
}

export interface CurveConf {
    p?: BN | string | number;
    prime?: BN | string | number;
    n?: BN | string | number;
    g?: BN | string | number;
    gRed?: boolean;
}

export type CurveType = 'edwards' | 'mont' | 'short';
export declare class BaseCurve {
    type: CurveType;
    p: BN;
    zero: BN;
    one: BN;
    two: BN;
    n: BN;
    g: BasePoint;
    redN: BN | null;
    constructor(type: CurveType, conf: CurveConf);
    point(): void;
    validate(): void;
}

export interface EdwardsCurveConf extends CurveConf {
    a?: BN | string | number;
    c?: BN | string | number;
    n?: BN | string | number;
}

export declare class EdwardsCurve extends BaseCurve {
    twisted: boolean;
    mOneA: boolean;
    extended: boolean;
    type: 'edwards';
    a: BN;
    c: BN;
    c2: BN;
    d: BN;
    dd: BN;
    oneC: boolean;
    constructor(conf: EdwardsCurveConf);
    point(x: BN | string | number, y: BN | string | number, z: BN | string | number, t: BN | string | number): EPoint;
    jpoint(x: BN | string | number, y: BN | string | number, z: BN | string | number, t: BN | string | number): EPoint;
    pointFromX(x: BN | string | number, odd?: boolean): EPoint;
    pointFromY(y: BN | string | number, odd?: boolean): EPoint;
    validate(point: EPoint): boolean;
    pointFromJSON(obj: [string, string, string]): EPoint;
}

export interface MontCurveConf extends CurveConf {
    a?: BN | string | number;
    b?: BN | string | number;
}

export declare class MontCurve extends BaseCurve {
    type: 'mont';
    a: BN;
    b: BN;
    i4: BN;
    two: BN;
    a24: BN;
    constructor(conf: MontCurveConf);
    validate(point: MPoint): boolean;
    decodePoint(bytes: Message, enc?: Encoding): MPoint;
    point(x: BN | string | number, z: BN | string | number): MPoint;
    pointFromJSON(obj: [string, string?]): MPoint;
}

export interface ShortCurveConf extends CurveConf {
    a?: BN | string | number;
    b?: BN | string | number;
}

export declare class ShortCurve extends BaseCurve {
    type: 'short';
    a: BN;
    b: BN;
    tinv: BN;
    zeroA: boolean;
    threeA: boolean;
    endo: { beta: BN, lambda: BN, basis: [BN, BN] };
    constructor(conf: ShortCurveConf);
    pointFromX(x: BN | string | number, odd?: boolean): SPoint;
    validate(point: SPoint): boolean;
    point(x: BN | string | number, y: BN | string | number): SPoint;
    jpoint(x: BN | string | number, y: BN | string | number, z: BN | string | number): JPoint;
    pointFromJSON(obj: [string, string, string], red?: boolean);
}

export type PointType = 'projective' | 'affine';

export declare type Point = BasePoint | Buffer | string | {
    x: Buffer | string | Array,
    y: Buffer | string | Array,
}

export declare class BasePoint {
    curve: BaseCurve;
    type: PointType;
    precomputed: BasePoint | null;
    // constructor(curve: BaseCurve, type: PointType);
    eq(other: BasePoint): boolean;
    validate(): boolean;
    decodePoint(bytes: Message, enc?: Encoding): BasePoint;
    encodeCompressed(enc?: Encoding): string;
    encode(enc?: Encoding): string;
    precompute(power: number): BasePoint;
    dblp(k: number): BasePoint;
    toBuffer(): Buffer;
    toArray(): Array;
}

export declare class EPoint extends BasePoint {
    type: 'projective';
    x: BN;
    y: BN;
    z: BN;
    t: BN;
    // constructor(curve: BaseCurve, x: BN | string | number, y: BN | string | number, z: BN | string | number, t: BN | string | number);
    static fromJSON(curve: BaseCurve, obj: [string, string, string]): EPoint;
    inspect(): string;
    isInfinity(): boolean;
    dbl(): EPoint;
    add(p: EPoint): EPoint;
    mixedAdd(p: EPoint): EPoint;
    mul(p: number): EPoint;
    mulAdd(k1: BN, p: EPoint, k2: BN): EPoint;
    jmulAdd(k1: BN, p: EPoint, k2: BN): JPoint;
    normalize(): EPoint;
    neg(): EPoint;
    getX(): BN;
    getY(): BN; 
    eqXToP(x: BN): boolean;
    toP(): EPoint;
}
export declare class MPoint extends BasePoint {
    x: BN;
    z: BN;
    type: 'projective';
    // constructor(curve: BaseCurve, x: BN | string | number, z: BN | string | number);
    precompute(): void;
    static fromJSON(curve: BaseCurve, obj: [string, string?]): MPoint;
    inspect(): string;
    isInfinity(): boolean;
    dbl(): MPoint;
    add(): void;
    diffAdd(p: MPoint, diff: MPoint): MPoint;
    mul(p: BN | string | number): MPoint;
    mulAdd(): void;
    jumlAdd(): void;
    normalize(): MPoint;
    getX(): BN;
}

export declare class SPoint extends BasePoint {
    x: BN;
    y: BN;
    type: 'projective';
    // constructor(curve: BaseCurve, x: BN | string, y: BN | string, isRed?: boolean);
    toJSON(): string;
    static fromJSON(curve: BaseCurve, obj: [string, string, string], red?: boolean): SPoint;
    inspect(): string;
    dbl(): SPoint;
    add(p: SPoint): SPoint;
    getX(): BN;
    getY(): BN;
    mulAdd(k1: BN, p: SPoint, k2: BN): SPoint;
    jmulAdd(k1: BN, p: SPoint, k2: BN): JPoint;
    neg(): SPoint;
    toJ(): JPoint;
}

export declare class JPoint extends BasePoint {
    x: BN;
    y: BN;
    z: BN;
    // constructor(curve: BaseCurve, x: BN | string | number, y: BN | string | number, z: BN | string | number);
    toP(): SPoint;
    neg(): JPoint;
    add(p: JPoint): JPoint;
    mixedAdd(p: BasePoint): JPoint;
    dblp(pow: number): JPoint;
    dbl(): JPoint;
    mul(k: BN | string | number, kbase: number): JPoint;
    eqXToP(x: BN): boolean;
    inspect(): string;
    isInfinity(): boolean;
}

export declare const curve: { base: BaseCurve, short: ShortCurve, mont: MontCurve, edwards: EdwardsCurve};

export interface PresetCurveOptions {
    type: CurveType;
    hash: Hash;
}
export declare class PresetCurve {
    g: BasePoint;
    n: BN;
    hash: Hash;
}

export default {
    ec, eddsa
};