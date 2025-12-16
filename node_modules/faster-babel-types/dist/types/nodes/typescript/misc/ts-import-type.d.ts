import type * as t from '@babel/types';
export declare function tsImportType(argument: t.StringLiteral, qualifier?: t.TSEntityName | null | undefined, typeParameters?: t.TSTypeParameterInstantiation | null | undefined): t.TSImportType;
export declare function isTSImportType(node: t.Node | null | undefined): node is t.TSImportType;
export declare function assertTSImportType(node: t.Node | null | undefined): asserts node is t.TSImportType;
//# sourceMappingURL=ts-import-type.d.ts.map