import type * as t from '@babel/types';
export declare function tsTypeQuery(exprName: t.TSEntityName | t.TSImportType, typeParameters?: t.TSTypeParameterInstantiation | null | undefined): t.TSTypeQuery;
export declare function isTSTypeQuery(node: t.Node | null | undefined): node is t.TSTypeQuery;
export declare function assertTSTypeQuery(node: t.Node | null | undefined): asserts node is t.TSTypeQuery;
//# sourceMappingURL=ts-type-query.d.ts.map