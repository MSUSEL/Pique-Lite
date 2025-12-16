import type * as t from '@babel/types';
export declare function tsInstantiationExpression(expression: t.Expression, typeParameters?: t.TSTypeParameterInstantiation | null | undefined): t.TSInstantiationExpression;
export declare function isTSInstantiationExpression(node: t.Node | null | undefined): node is t.TSInstantiationExpression;
export declare function assertTSInstantiationExpression(node: t.Node | null | undefined): asserts node is t.TSInstantiationExpression;
//# sourceMappingURL=ts-instantiation-expression.d.ts.map