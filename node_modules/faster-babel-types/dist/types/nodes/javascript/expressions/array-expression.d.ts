import type * as t from '@babel/types';
export declare function arrayExpression(elements?: Array<null | t.Expression | t.SpreadElement>): t.ArrayExpression;
export declare function isArrayExpression(node: t.Node | null | undefined): node is t.ArrayExpression;
export declare function assertArrayExpression(node: t.Node | null | undefined): asserts node is t.ArrayExpression;
//# sourceMappingURL=array-expression.d.ts.map