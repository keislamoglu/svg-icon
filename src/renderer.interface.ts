/**
 * Interface that stand for svg icon renderer
 */
export interface Renderer {

    /**
     * Generate SVG from given element's attributes.
     */
    convertSvg(el: Element): void;
}
