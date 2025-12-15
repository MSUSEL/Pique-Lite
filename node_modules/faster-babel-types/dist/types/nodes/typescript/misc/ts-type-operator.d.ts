import type * as t from '@babel/types';
export declare function tsTypeOperator(typeAnnotation: t.TSType, operator?: string): t.TSTypeOperator;
export declare function isTSTypeOperator(node: t.Node | null | undefined): node is t.TSTypeOperator;
export declare function assertTSTypeOperator(node: t.Node | null | undefined): asserts node is t.TSTypeOperator;
//# sourceMappingURL=ts-type-operator.d.ts.map