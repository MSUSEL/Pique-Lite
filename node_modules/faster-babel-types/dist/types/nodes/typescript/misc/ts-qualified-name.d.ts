import type * as t from '@babel/types';
export declare function tsQualifiedName(left: t.TSEntityName, right: t.Identifier): t.TSQualifiedName;
export declare function isTSQualifiedName(node: t.Node | null | undefined): node is t.TSQualifiedName;
export declare function assertTSQualifiedName(node: t.Node | null | undefined): asserts node is t.TSQualifiedName;
//# sourceMappingURL=ts-qualified-name.d.ts.map