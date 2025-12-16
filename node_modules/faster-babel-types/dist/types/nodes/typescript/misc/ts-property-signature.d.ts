import type * as t from '@babel/types';
export type TSPropertySignature = 'get' | 'set' | null;
export declare function tsPropertySignature(key: t.Expression, typeAnnotation?: t.TSTypeAnnotation | null | undefined, kind?: TSPropertySignature): t.TSPropertySignature;
export declare function isTSPropertySignature(node: t.Node | null | undefined): node is t.TSPropertySignature;
export declare function assertTSPropertySignature(node: t.Node | null | undefined): asserts node is t.TSPropertySignature;
//# sourceMappingURL=ts-property-signature.d.ts.map