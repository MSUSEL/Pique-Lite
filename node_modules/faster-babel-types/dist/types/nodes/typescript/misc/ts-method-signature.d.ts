import type * as t from '@babel/types';
export type TSMethodSignatureKind = 'get' | 'set' | 'method';
export declare function tsMethodSignature(key: t.Expression, typeParameters: t.TSTypeParameterDeclaration | null | undefined, parameters: Array<t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement>, typeAnnotation?: t.TSTypeAnnotation | null | undefined, kind?: TSMethodSignatureKind): t.TSMethodSignature;
export declare function isTSMethodSignature(node: t.Node | null | undefined): node is t.TSMethodSignature;
export declare function assertTSMethodSignature(node: t.Node | null | undefined): asserts node is t.TSMethodSignature;
//# sourceMappingURL=ts-method-signature.d.ts.map