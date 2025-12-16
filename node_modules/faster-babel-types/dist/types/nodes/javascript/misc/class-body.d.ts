import type * as t from '@babel/types';
export declare function classBody(body: Array<t.ClassMethod | t.ClassPrivateMethod | t.ClassProperty | t.ClassPrivateProperty | t.ClassAccessorProperty | t.TSDeclareMethod | t.TSIndexSignature | t.StaticBlock>): t.ClassBody;
export declare function isClassBody(node: t.Node | null | undefined): node is t.ClassBody;
export declare function assertClassBody(node: t.Node | null | undefined): asserts node is t.ClassBody;
//# sourceMappingURL=class-body.d.ts.map