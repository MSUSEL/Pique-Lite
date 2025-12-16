import type * as t from '@babel/types';
export declare function tsEnumDeclaration(id: t.Identifier, members: t.TSEnumMember[]): t.TSEnumDeclaration;
export declare function isTSEnumDeclaration(node: t.Node | null | undefined): node is t.TSEnumDeclaration;
export declare function assertTSEnumDeclaration(node: t.Node | null | undefined): asserts node is t.TSEnumDeclaration;
//# sourceMappingURL=ts-enum-declaration.d.ts.map