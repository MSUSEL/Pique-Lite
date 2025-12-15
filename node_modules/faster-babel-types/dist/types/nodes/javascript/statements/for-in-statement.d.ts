import type * as t from '@babel/types';
export declare function forInStatement(left: t.VariableDeclaration | t.LVal, right: t.Expression, body: t.Statement): t.ForInStatement;
export declare function isForInStatement(node: t.Node | null | undefined): node is t.ForInStatement;
export declare function assertForInStatement(node: t.Node | null | undefined): asserts node is t.ForInStatement;
//# sourceMappingURL=for-in-statement.d.ts.map