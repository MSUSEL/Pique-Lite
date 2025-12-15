import type * as t from '@babel/types';
export declare function tsSatisfiesExpression(expression: t.Expression, typeAnnotation: t.TSType): t.TSSatisfiesExpression;
export declare function isTSSatisfiesExpression(node: t.Node | null | undefined): node is t.TSSatisfiesExpression;
export declare function assertTSSatisfiesExpression(node: t.Node | null | undefined): asserts node is t.TSSatisfiesExpression;
//# sourceMappingURL=ts-satisfies-expression.d.ts.map