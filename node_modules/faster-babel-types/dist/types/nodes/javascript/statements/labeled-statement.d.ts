import type * as t from '@babel/types';
export declare function labeledStatement(label: t.Identifier, body: t.Statement): t.LabeledStatement;
export declare function isLabeledStatement(node: t.Node | null | undefined): node is t.LabeledStatement;
export declare function assertLabeledStatement(node: t.Node | null | undefined): asserts node is t.LabeledStatement;
//# sourceMappingURL=labeled-statement.d.ts.map