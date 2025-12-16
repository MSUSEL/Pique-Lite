import type * as t from '@babel/types';
export declare function sequenceExpression(expressions: t.Expression[]): t.SequenceExpression;
export declare function isSequenceExpression(node: t.Node | null | undefined): node is t.SequenceExpression;
export declare function assertSequenceExpression(node: t.Node | null | undefined): asserts node is t.SequenceExpression;
//# sourceMappingURL=sequence-expression.d.ts.map