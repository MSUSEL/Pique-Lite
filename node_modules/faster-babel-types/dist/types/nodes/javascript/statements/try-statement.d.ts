import type * as t from '@babel/types';
export declare function tryStatement(block: t.BlockStatement, handler?: t.CatchClause | null | undefined, finalizer?: t.BlockStatement | null | undefined): t.TryStatement;
export declare function isTryStatement(node: t.Node | null | undefined): node is t.TryStatement;
export declare function assertTryStatement(node: t.Node | null | undefined): asserts node is t.TryStatement;
//# sourceMappingURL=try-statement.d.ts.map