import type * as t from '@babel/types';
export declare function tupleExpression(elements?: Array<t.Expression | t.SpreadElement>): t.TupleExpression;
export declare function isTupleExpression(node: t.Node | null | undefined): node is t.TupleExpression;
export declare function assertTupleExpression(node: t.Node | null | undefined): asserts node is t.TupleExpression;
//# sourceMappingURL=tuple-expression.d.ts.map