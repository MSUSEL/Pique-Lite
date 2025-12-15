import type * as t from '@babel/types';
export declare function classExpression(id: t.Identifier | null | undefined, superClass: t.Expression | null | undefined, body: t.ClassBody, decorators?: t.Decorator[] | null | undefined): t.ClassExpression;
export declare function isClassExpression(node: t.Node | null | undefined): node is t.ClassExpression;
export declare function assertClassExpression(node: t.Node | null | undefined): asserts node is t.ClassExpression;
//# sourceMappingURL=class-expression.d.ts.map