import type * as t from '@babel/types';
export declare function assert<T extends t.Node['type'], P extends Extract<t.Node, {
    type: T;
}>>(type: T, node: t.Node | null | undefined): asserts node is P;
export declare function assertEither<T extends t.Node['type'], P extends Extract<t.Node, {
    type: T;
}>>(name: string, types: Set<T>, node: t.Node | null | undefined): asserts node is P;
//# sourceMappingURL=assert-node-type.d.ts.map