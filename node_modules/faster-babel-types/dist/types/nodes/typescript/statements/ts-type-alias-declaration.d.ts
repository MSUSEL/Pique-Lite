import type * as t from '@babel/types';
export declare function tsTypeAliasDeclaration(id: t.Identifier, typeParameters: t.TSTypeParameterDeclaration | null | undefined, typeAnnotation: t.TSType): t.TSTypeAliasDeclaration;
export declare function isTSTypeAliasDeclaration(node: t.Node | null | undefined): node is t.TSTypeAliasDeclaration;
export declare function assertTSTypeAliasDeclaration(node: t.Node | null | undefined): asserts node is t.TSTypeAliasDeclaration;
//# sourceMappingURL=ts-type-alias-declaration.d.ts.map