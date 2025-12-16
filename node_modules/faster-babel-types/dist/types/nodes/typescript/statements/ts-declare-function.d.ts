import type * as t from '@babel/types';
export declare function tsDeclareFunction(id: t.Identifier | null | undefined, typeParameters: t.TSTypeParameterDeclaration | t.Noop | null | undefined, params: Array<t.Identifier | t.Pattern | t.RestElement>, returnType?: t.TSTypeAnnotation | t.Noop | null): t.TSDeclareFunction;
export declare function isTSDeclareFunction(node: t.Node | null | undefined): node is t.TSDeclareFunction;
export declare function assertTSDeclareFunction(node: t.Node | null | undefined): asserts node is t.TSDeclareFunction;
//# sourceMappingURL=ts-declare-function.d.ts.map