import type * as t from '@babel/types';
export declare function objectMethod(kind: 'method' | 'get' | 'set', key: t.Expression | t.Identifier | t.StringLiteral | t.NumericLiteral | t.BigIntLiteral, params: Array<t.Identifier | t.Pattern | t.RestElement>, body: t.BlockStatement, computed?: boolean, generator?: boolean, async?: boolean): t.ObjectMethod;
export declare function isObjectMethod(node: t.Node | null | undefined): node is t.ObjectMethod;
export declare function assertObjectMethod(node: t.Node | null | undefined): asserts node is t.ObjectMethod;
//# sourceMappingURL=object-method.d.ts.map