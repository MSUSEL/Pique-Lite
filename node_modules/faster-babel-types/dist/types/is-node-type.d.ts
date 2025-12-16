import type * as t from '@babel/types';
export declare function is<T extends t.Node['type'], P extends Extract<t.Node, {
    type: T;
}>>(type: T, node: t.Node | null | undefined): node is P;
export declare function either<T extends t.Node['type'], P extends Extract<t.Node, {
    type: T;
}>>(types: Set<T>, node: t.Node | null | undefined): node is P;
//# sourceMappingURL=is-node-type.d.ts.map