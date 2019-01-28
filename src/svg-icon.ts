import {SvgRenderer as Renderer, Config as RendererConfig} from "./svg-renderer";

export interface Config extends RendererConfig {
    /**
     * Stands for getting all proper elements that will be converted into SVG icon
     */
    selector: string;
}

/**
 * Renders proper elements according to given selector to SVG icons.
 * This can be used to render html element to convert into svg icon for once or continuously.
 *
 * Requires {@link Config}
 */
export class SvgIcon {
    private _mutationObserver: MutationObserver | null = null;
    private _renderer: Renderer;

    constructor(private config: Config) {
        this._renderer = new Renderer({
            iconCodes: config.iconCodes,
            symbolDefsPath: config.symbolDefsPath,
            prefix: config.prefix
        });
    }

    /**
     * Start observing changes on given element to render continuously the icons
     */
    startObserving(html: Element) {
        this._render(html);
        this._mutationObserver = new MutationObserver(this._observerCallback.bind(this));
        this._mutationObserver.observe(html, {childList: true, subtree: true});
    }

    /**
     * Stop observing the element.
     */
    stopObserving() {
        if (this._mutationObserver !== null) {
            this._mutationObserver.disconnect();
            this._mutationObserver = null;
        }
    }

    /**
     * Render for once given element
     */
    renderOnce(html: Element) {
        this._render(html);
    }

    /**
     * Render proper elements (according to selector) to relevant svg icons
     */
    private _render(html: Element) {
        // If matches with selector, convert the html into SVG it-self directly.
        if (html.matches(this.config.selector)) {
            this._renderer.convertSvg(html);
            return;
        }

        // Otherwise, look for child nodes.
        const nodeList = html.querySelectorAll(this.config.selector);

        for (let i = 0, l = nodeList.length; i < l; i++)
            this._renderer.convertSvg(nodeList.item(i));
    }

    /**
     * Mutation observer callback.
     */
    private _observerCallback(mutations: MutationRecord[]) {
        mutations.forEach(mutation => {
            for (let i = 0, nodeList = mutation.addedNodes, l = nodeList.length; i < l; i++) {
                const node = nodeList.item(i);
                if (node instanceof Element) this._render(node);
            }
        });
    }
}