import type * as t from '@babel/types';
export declare function declareOpaqueType(id: t.Identifier, typeParameters?: t.TypeParameterDeclaration | null, supertype?: t.FlowType | null): t.DeclareOpaqueType;
export declare function isDeclareOpaqueType(node: t.Node | null | undefined): node is t.DeclareOpaqueType;
export declare function assertDeclareOpaqueType(node: t.Node | null | undefined): asserts node is t.DeclareOpaqueType;
//# sourceMappingURL=declare-opaque-type.d.ts.map