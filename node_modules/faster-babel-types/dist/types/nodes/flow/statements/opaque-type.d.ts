import type * as t from '@babel/types';
export declare function opaqueType(id: t.Identifier, typeParameters: t.TypeParameterDeclaration | null | undefined, supertype: t.FlowType | null | undefined, impltype: t.FlowType): t.OpaqueType;
export declare function isOpaqueType(node: t.Node | null | undefined): node is t.OpaqueType;
export declare function assertOpaqueType(node: t.Node | null | undefined): asserts node is t.OpaqueType;
//# sourceMappingURL=opaque-type.d.ts.map