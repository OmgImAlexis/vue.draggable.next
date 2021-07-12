import * as vue from 'vue';

declare const draggableComponent: vue.DefineComponent<{
    list: {
        type: ArrayConstructor;
        required: boolean;
        default: any;
    };
    modelValue: {
        type: ArrayConstructor;
        required: boolean;
        default: any;
    };
    itemKey: {
        type: (StringConstructor | FunctionConstructor)[];
        required: boolean;
    };
    clone: {
        type: FunctionConstructor;
        default: (original: any) => any;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    move: {
        type: FunctionConstructor;
        default: any;
    };
    componentData: {
        type: ObjectConstructor;
        required: boolean;
        default: any;
    };
}, unknown, {
    error: boolean;
}, {
    realList(): any;
    getKey(): any;
}, {
    getUnderlyingVm(domElement: any): any;
    getUnderlyingPotencialDraggableComponent(htmElement: any): any;
    emitChanges(evt: any): void;
    alterList(onList: any): void;
    spliceList(): void;
    updatePosition(oldIndex: any, newIndex: any): void;
    getRelatedContextFromMoveEvent({ to, related }: {
        to: any;
        related: any;
    }): any;
    getVmIndexFromDomIndex(domIndex: any): any;
    onDragStart(evt: any): void;
    onDragAdd(evt: any): void;
    onDragRemove(evt: any): void;
    onDragUpdate(evt: any): void;
    computeFutureIndex(relatedContext: any, evt: any): any;
    onDragMove(evt: any, originalEvent: any): any;
    onDragEnd(): void;
}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, string[], string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    list: unknown[];
    modelValue: unknown[];
    clone: Function;
    tag: string;
    move: Function;
    componentData: Record<string, any>;
} & {
    itemKey?: string | Function;
}>, {
    list: unknown[];
    modelValue: unknown[];
    clone: Function;
    tag: string;
    move: Function;
    componentData: Record<string, any>;
}>;

export { draggableComponent };
