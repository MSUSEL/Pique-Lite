import type * as t from '@babel/types';
export declare function exportNamedDeclaration(declaration?: t.Declaration | null | undefined, specifiers?: Array<t.ExportSpecifier | t.ExportDefaultSpecifier | t.ExportNamespaceSpecifier>, source?: t.StringLiteral | null | undefined): t.ExportNamedDeclaration;
export declare function isExportNamedDeclaration(node: t.Node | null | undefined): node is t.ExportNamedDeclaration;
export declare function assertExportNamedDeclaration(node: t.Node | null | undefined): asserts node is t.ExportNamedDeclaration;
//# sourceMappingURL=export-named-declaration.d.ts.map