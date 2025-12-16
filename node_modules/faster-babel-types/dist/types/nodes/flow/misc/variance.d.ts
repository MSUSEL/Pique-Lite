import type * as t from '@babel/types';
export type VarianceKind = 'minus' | 'plus';
export declare function variance(kind: VarianceKind): t.Variance;
export declare function isVariance(node: t.Node | null | undefined): node is t.Variance;
export declare function assertVariance(node: t.Node | null | undefined): asserts node is t.Variance;
//# sourceMappingURL=variance.d.ts.map