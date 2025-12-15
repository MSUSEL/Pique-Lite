import type * as t from '@babel/types';
export declare function exportSpecifier(local: t.Identifier, exported: t.Identifier | t.StringLiteral): t.ExportSpecifier;
export declare function isExportSpecifier(node: t.Node | null | undefined): node is t.ExportSpecifier;
export declare function assertExportSpecifier(node: t.Node | null | undefined): asserts node is t.ExportSpecifier;
//# sourceMappingURL=export-specifier.d.ts.map