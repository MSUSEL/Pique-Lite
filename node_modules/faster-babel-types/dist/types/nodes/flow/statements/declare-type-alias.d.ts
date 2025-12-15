import type * as t from '@babel/types';
export declare function declareTypeAlias(id: t.Identifier, typeParameters: t.TypeParameterDeclaration | null, right: t.FlowType): t.DeclareTypeAlias;
export declare function isDeclareTypeAlias(node: t.Node | null | undefined): node is t.DeclareTypeAlias;
export declare function assertDeclareTypeAlias(node: t.Node | null | undefined): asserts node is t.DeclareTypeAlias;
//# sourceMappingURL=declare-type-alias.d.ts.map