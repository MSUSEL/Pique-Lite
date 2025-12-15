import type * as t from '@babel/types';
export type ClassMethodKind = 'get' | 'set' | 'method' | 'constructor';
export declare function classMethod(kind: ClassMethodKind, key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.BigIntLiteral | t.Expression, params: Array<t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty>, body: t.BlockStatement, computed?: boolean, isStatic?: boolean, generator?: boolean, async?: boolean): t.ClassMethod;
export declare function isClassMethod(node: t.Node | null | undefined): node is t.ClassMethod;
export declare function assertClassMethod(node: t.Node | null | undefined): asserts node is t.ClassMethod;
//# sourceMappingURL=class-method.d.ts.map