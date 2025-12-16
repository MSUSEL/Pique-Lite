import type * as t from '@babel/types';
export declare function tsExpressionWithTypeArguments(expression: t.TSEntityName, typeParameters?: t.TSTypeParameterInstantiation | null | undefined): t.TSExpressionWithTypeArguments;
export declare function isTSExpressionWithTypeArguments(node: t.Node | null | undefined): node is t.TSExpressionWithTypeArguments;
export declare function assertTSExpressionWithTypeArguments(node: t.Node | null | undefined): asserts node is t.TSExpressionWithTypeArguments;
//# sourceMappingURL=ts-expression-with-type-arguments.d.ts.map