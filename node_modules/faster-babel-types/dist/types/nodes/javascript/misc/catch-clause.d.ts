import type * as t from '@babel/types';
export declare function catchClause(param: t.Identifier | t.ArrayPattern | t.ObjectPattern | null | undefined, body: t.BlockStatement): t.CatchClause;
export declare function isCatchClause(node: t.Node | null | undefined): node is t.CatchClause;
export declare function assertCatchClause(node: t.Node | null | undefined): asserts node is t.CatchClause;
//# sourceMappingURL=catch-clause.d.ts.map