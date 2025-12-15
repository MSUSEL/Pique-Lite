import type * as t from '@babel/types';
export declare function classDeclaration(id: t.Identifier | null | undefined, superClass: t.Expression | null | undefined, body: t.ClassBody, decorators?: t.Decorator[] | null | undefined): t.ClassDeclaration;
export declare function isClassDeclaration(node: t.Node | null | undefined): node is t.ClassDeclaration;
export declare function assertClassDeclaration(node: t.Node | null | undefined): asserts node is t.ClassDeclaration;
//# sourceMappingURL=class-declaration.d.ts.map