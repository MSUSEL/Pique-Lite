import type * as t from '@babel/types';
export declare function tsNonNullExpression(expression: t.Expression): t.TSNonNullExpression;
export declare function isTSNonNullExpression(node: t.Node | null | undefined): node is t.TSNonNullExpression;
export declare function assertTSNonNullExpression(node: t.Node | null | undefined): asserts node is t.TSNonNullExpression;
//# sourceMappingURL=ts-non-null-expression.d.ts.map