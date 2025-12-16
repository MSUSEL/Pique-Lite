import type * as t from '@babel/types';
export declare function switchCase(test: t.Expression | null | undefined, consequent: t.Statement[]): t.SwitchCase;
export declare function isSwitchCase(node: t.Node | null | undefined): node is t.SwitchCase;
export declare function assertSwitchCase(node: t.Node | null | undefined): asserts node is t.SwitchCase;
//# sourceMappingURL=switch-case.d.ts.map