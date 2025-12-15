import type * as t from '@babel/types';
export declare function ifStatement(test: t.Expression, consequent: t.Statement, alternate?: t.Statement | null | undefined): t.IfStatement;
export declare function isIfStatement(node: t.Node | null | undefined): node is t.IfStatement;
export declare function assertIfStatement(node: t.Node | null | undefined): asserts node is t.IfStatement;
//# sourceMappingURL=if-statement.d.ts.map