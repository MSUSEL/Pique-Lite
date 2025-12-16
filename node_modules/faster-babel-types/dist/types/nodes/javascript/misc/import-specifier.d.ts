import type * as t from '@babel/types';
export declare function importSpecifier(local: t.Identifier, imported: t.Identifier | t.StringLiteral): t.ImportSpecifier;
export declare function isImportSpecifier(node: t.Node | null | undefined): node is t.ImportSpecifier;
export declare function assertImportSpecifier(node: t.Node | null | undefined): asserts node is t.ImportSpecifier;
//# sourceMappingURL=import-specifier.d.ts.map