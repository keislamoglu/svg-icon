import 'svgxuse'; // Must be imported for cross-browser compatibility
import {Renderer} from "./renderer.interface";

/**
 * Renderer config
 */
export interface RendererConfig {
    /**
     * Definition path of svg symbols
     */
    symbolDefsPath: string;
    /**
     * Stands for capturing the icon code by regular expression
     */
    prefix: string;
    /**
     * Stands for code list to ensure parsing proper elements
     */
    iconCodes: string[];
}

/**
 * Convert given proper element to SVG.
 *
 * Requires {@link RendererConfig}
 */
export class SvgRenderer implements Renderer {

    constructor(private config: RendererConfig) {
    }

    /**
     * @inheritDoc
     */
    public convertSvg(el: Element): void {
        if (!el.parentNode) throw new Error('Element should have a parent node');

        const iconCode = this._parseIconCode(el);

        if (!iconCode) return;

        const svg = document.createElement('svg');

        for (let i = 0, attributes = el.attributes, l = attributes.length; i < l; i++)
            svg.setAttribute(attributes[i].name, attributes[i].value);

        svg.innerHTML = `<use href="${this.config.symbolDefsPath}#${iconCode}"></use>`;
        el.outerHTML = svg.outerHTML + `\n<!--${el.outerHTML}-->`;
    }

    /**
     * Parse icon code from class of element
     */
    private _parseIconCode(el: Element): string | null {
        for (let i = 0, l = el.classList.length; i < l; i++) {
            const matches = new RegExp(this.config.prefix + '(\\w+)').exec(el.classList.item(i) as string);
            if (matches && this.config.iconCodes.indexOf(matches[1]) !== -1) {
                return matches[0];
            }
        }
        return null;
    }
}
