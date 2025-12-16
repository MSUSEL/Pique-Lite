import type * as t from '@babel/types';
export declare function tsImportEqualsDeclaration(id: t.Identifier, moduleReference: t.TSEntityName | t.TSExternalModuleReference): t.TSImportEqualsDeclaration;
export declare function isTSImportEqualsDeclaration(node: t.Node | null | undefined): node is t.TSImportEqualsDeclaration;
export declare function assertTSImportEqualsDeclaration(node: t.Node | null | undefined): asserts node is t.TSImportEqualsDeclaration;
//# sourceMappingURL=ts-import-equals-declaration.d.ts.map