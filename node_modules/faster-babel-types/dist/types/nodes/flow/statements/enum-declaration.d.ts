import type * as t from '@babel/types';
export declare function enumDeclaration(id: t.Identifier, body: t.EnumBooleanBody | t.EnumNumberBody | t.EnumStringBody | t.EnumSymbolBody): t.EnumDeclaration;
export declare function isEnumDeclaration(node: t.Node | null | undefined): node is t.EnumDeclaration;
export declare function assertEnumDeclaration(node: t.Node | null | undefined): asserts node is t.EnumDeclaration;
//# sourceMappingURL=enum-declaration.d.ts.map