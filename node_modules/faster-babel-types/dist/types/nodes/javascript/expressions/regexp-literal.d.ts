import type * as t from '@babel/types';
export declare function regExpLiteral(pattern: string, flags?: string): t.RegExpLiteral;
export declare function isRegExpLiteral(node: t.Node | null | undefined): node is t.RegExpLiteral;
export declare function assertRegExpLiteral(node: t.Node | null | undefined): asserts node is t.RegExpLiteral;
//# sourceMappingURL=regexp-literal.d.ts.map