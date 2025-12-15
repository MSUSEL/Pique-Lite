import type * as t from '@babel/types';
export declare function typeAlias(id: t.Identifier, typeParameters: t.TypeParameterDeclaration | null | undefined, right: t.FlowType): t.TypeAlias;
export declare function isTypeAlias(node: t.Node | null | undefined): node is t.TypeAlias;
export declare function assertTypeAlias(node: t.Node | null | undefined): asserts node is t.TypeAlias;
//# sourceMappingURL=type-alias.d.ts.map