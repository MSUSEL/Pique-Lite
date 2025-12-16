import type * as t from '@babel/types';
export declare function functionDeclaration(id: t.Identifier | null | undefined, params: Array<t.Identifier | t.Pattern | t.RestElement>, body: t.BlockStatement, generator?: boolean, async?: boolean): t.FunctionDeclaration;
export declare function isFunctionDeclaration(node: t.Node | null | undefined): node is t.FunctionDeclaration;
export declare function assertFunctionDeclaration(node: t.Node | null | undefined): asserts node is t.FunctionDeclaration;
//# sourceMappingURL=function-declaration.d.ts.map