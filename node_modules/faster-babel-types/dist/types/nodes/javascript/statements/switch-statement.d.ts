import type * as t from '@babel/types';
export declare function switchStatement(discriminant: t.Expression, cases: t.SwitchCase[]): t.SwitchStatement;
export declare function isSwitchStatement(node: t.Node | null | undefined): node is t.SwitchStatement;
export declare function assertSwitchStatement(node: t.Node | null | undefined): asserts node is t.SwitchStatement;
//# sourceMappingURL=switch-statement.d.ts.map