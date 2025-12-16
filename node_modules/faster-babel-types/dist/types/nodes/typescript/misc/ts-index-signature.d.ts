import type * as t from '@babel/types';
export declare function tsIndexSignature(parameters: t.Identifier[], typeAnnotation?: t.TSTypeAnnotation | null | undefined): t.TSIndexSignature;
export declare function isTSIndexSignature(node: t.Node | null | undefined): node is t.TSIndexSignature;
export declare function assertTSIndexSignature(node: t.Node | null | undefined): asserts node is t.TSIndexSignature;
//# sourceMappingURL=ts-index-signature.d.ts.map