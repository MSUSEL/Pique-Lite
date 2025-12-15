import type * as t from '@babel/types';
export declare function importDeclaration(specifiers: Array<t.ImportSpecifier | t.ImportDefaultSpecifier | t.ImportNamespaceSpecifier>, source: t.StringLiteral): t.ImportDeclaration;
export declare function isImportDeclaration(node: t.Node | null | undefined): node is t.ImportDeclaration;
export declare function assertImportDeclaration(node: t.Node | null | undefined): asserts node is t.ImportDeclaration;
//# sourceMappingURL=import-declaration.d.ts.map