import type * as t from '@babel/types';
export declare function withStatement(object: t.Expression, body: t.Statement): t.WithStatement;
export declare function isWithStatement(node: t.Node | null | undefined): node is t.WithStatement;
export declare function assertWithStatement(node: t.Node | null | undefined): asserts node is t.WithStatement;
//# sourceMappingURL=with-statement.d.ts.map