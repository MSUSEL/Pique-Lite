import type * as t from '@babel/types';
export declare function doExpression(body: t.BlockStatement, async?: boolean): t.DoExpression;
export declare function isDoExpression(node: t.Node | null | undefined): node is t.DoExpression;
export declare function assertDoExpression(node: t.Node | null | undefined): asserts node is t.DoExpression;
//# sourceMappingURL=do-expression.d.ts.map