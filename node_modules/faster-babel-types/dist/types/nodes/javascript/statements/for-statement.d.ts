import type * as t from '@babel/types';
export declare function forStatement(init: t.VariableDeclaration | t.Expression | null | undefined, test: t.Expression | null | undefined, update: t.Expression | null | undefined, body: t.Statement): t.ForStatement;
export declare function isForStatement(node: t.Node | null | undefined): node is t.ForStatement;
export declare function assertForStatement(node: t.Node | null | undefined): asserts node is t.ForStatement;
//# sourceMappingURL=for-statement.d.ts.map