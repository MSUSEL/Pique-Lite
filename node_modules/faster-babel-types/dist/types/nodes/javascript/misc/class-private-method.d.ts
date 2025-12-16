import type * as t from '@babel/types';
export type ClassPrivateMethodKind = 'get' | 'set' | 'method';
export declare function classPrivateMethod(kind: ClassPrivateMethodKind, key: t.PrivateName, params: Array<t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty>, body: t.BlockStatement, computed?: boolean, isStatic?: boolean, generator?: boolean, async?: boolean): t.ClassPrivateMethod;
export declare function isClassPrivateMethod(node: t.Node | null | undefined): node is t.ClassPrivateMethod;
export declare function assertClassPrivateMethod(node: t.Node | null | undefined): asserts node is t.ClassPrivateMethod;
//# sourceMappingURL=class-private-method.d.ts.map