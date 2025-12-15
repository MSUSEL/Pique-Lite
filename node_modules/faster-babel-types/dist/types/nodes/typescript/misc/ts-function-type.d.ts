import type * as t from '@babel/types';
export declare function tsFunctionType(typeParameters: t.TSTypeParameterDeclaration | null | undefined, parameters: Array<t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement>, typeAnnotation?: t.TSTypeAnnotation | null | undefined): t.TSFunctionType;
export declare function isTSFunctionType(node: t.Node | null | undefined): node is t.TSFunctionType;
export declare function assertTSFunctionType(node: t.Node | null | undefined): asserts node is t.TSFunctionType;
//# sourceMappingURL=ts-function-type.d.ts.map