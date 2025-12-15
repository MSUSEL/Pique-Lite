import type * as t from '@babel/types';
export declare function jsxFragment(openingFragment: t.JSXOpeningFragment, closingFragment: t.JSXClosingFragment, children: Array<t.JSXText | t.JSXExpressionContainer | t.JSXSpreadChild | t.JSXElement | t.JSXFragment>): t.JSXFragment;
export declare function isJSXFragment(node: t.Node | null | undefined): node is t.JSXFragment;
export declare function assertJSXFragment(node: t.Node | null | undefined): asserts node is t.JSXFragment;
//# sourceMappingURL=jsx-fragment.d.ts.map