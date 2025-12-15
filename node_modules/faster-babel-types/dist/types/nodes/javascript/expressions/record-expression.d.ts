import type * as t from '@babel/types';
export declare function recordExpression(properties: Array<t.ObjectProperty | t.SpreadElement>): t.RecordExpression;
export declare function isRecordExpression(node: t.Node | null | undefined): node is t.RecordExpression;
export declare function assertRecordExpression(node: t.Node | null | undefined): asserts node is t.RecordExpression;
//# sourceMappingURL=record-expression.d.ts.map