import type * as t from '@babel/types';
export declare function tsAsExpression(expression: t.Expression, typeAnnotation: t.TSType): t.TSAsExpression;
export declare function isTSAsExpression(node: t.Node | null | undefined): node is t.TSAsExpression;
export declare function assertTSAsExpression(node: t.Node | null | undefined): asserts node is t.TSAsExpression;
//# sourceMappingURL=ts-as-expression.d.ts.map