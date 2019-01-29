import { Config as RendererConfig } from "./svg-renderer";
export interface Config extends RendererConfig {
    selector: string;
}
export declare class SvgIcon {
    private config;
    private _mutationObserver;
    private _renderer;
    constructor(config: Config);
    startObserving(html: Element): void;
    stopObserving(): void;
    renderOnce(html: Element): void;
    private _render(html);
    private _observerCallback(mutations);
}
