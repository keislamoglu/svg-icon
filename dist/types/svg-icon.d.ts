import { Renderer } from "./renderer.interface";
export declare class SvgIcon {
    private renderer;
    private selector;
    private _mutationObserver;
    constructor(renderer: Renderer, selector: string);
    startObserving(html: Element): void;
    stopObserving(): void;
    renderOnce(html: Element): void;
    private _render;
    private _observerCallback;
}
