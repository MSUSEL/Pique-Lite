import type * as t from '@babel/types';
export declare function typeCastExpression(expression: t.Expression, typeAnnotation: t.TypeAnnotation): t.TypeCastExpression;
export declare function isTypeCastExpression(node: t.Node | null | undefined): node is t.TypeCastExpression;
export declare function assertTypeCastExpression(node: t.Node | null | undefined): asserts node is t.TypeCastExpression;
//# sourceMappingURL=typecast-expression.d.ts.map