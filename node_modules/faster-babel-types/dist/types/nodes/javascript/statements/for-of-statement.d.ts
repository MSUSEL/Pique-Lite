import type * as t from '@babel/types';
export declare function forOfStatement(left: t.VariableDeclaration | t.LVal, right: t.Expression, body: t.Statement, isAwait: boolean): t.ForOfStatement;
export declare function isForOfStatement(node: t.Node | null | undefined): node is t.ForOfStatement;
export declare function assertForOfStatement(node: t.Node | null | undefined): asserts node is t.ForOfStatement;
//# sourceMappingURL=for-of-statement.d.ts.map