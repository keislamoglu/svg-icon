import {Renderer} from "./renderer.interface";

/**
 * Renders proper elements according to given selector to SVG icons.
 * This can be used to render html element to convert into svg icon for once or continuously.
 */
export class SvgIcon {
    private _mutationObserver: MutationObserver | null = null;

    constructor(private renderer: Renderer, private selector: string) {
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
        if (html.matches(this.selector)) {
            this.renderer.convertSvg(html);
            return;
        }

        // Otherwise, look for child nodes.
        const nodeList = html.querySelectorAll(this.selector);

        for (let i = 0, l = nodeList.length; i < l; i++)
            this.renderer.convertSvg(nodeList.item(i));
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
