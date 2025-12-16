import type * as t from '@babel/types';
export declare function declareExportDeclaration(declaration?: t.Flow | null, specifiers?: Array<t.ExportSpecifier | t.ExportNamespaceSpecifier> | null, source?: t.StringLiteral | null): t.DeclareExportDeclaration;
export declare function isDeclareExportDeclaration(node: t.Node | null | undefined): node is t.DeclareExportDeclaration;
export declare function assertDeclareExportDeclaration(node: t.Node | null | undefined): asserts node is t.DeclareExportDeclaration;
//# sourceMappingURL=declare-export-declaration.d.ts.map