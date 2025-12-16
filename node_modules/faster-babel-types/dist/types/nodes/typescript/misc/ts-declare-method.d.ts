import type * as t from '@babel/types';
export declare function tsDeclareMethod(decorators: t.Decorator[] | null | undefined, key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.BigIntLiteral | t.Expression, typeParameters: t.TSTypeParameterDeclaration | t.Noop | null | undefined, params: Array<t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty>, returnType?: t.TSTypeAnnotation | t.Noop | null | undefined): t.TSDeclareMethod;
export declare function isTSDeclareMethod(node: t.Node | null | undefined): node is t.TSDeclareMethod;
export declare function assertTSDeclareMethod(node: t.Node | null | undefined): asserts node is t.TSDeclareMethod;
//# sourceMappingURL=ts-declare-method.d.ts.map