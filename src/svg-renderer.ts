import 'svgxuse';

/**
 * Renders proper elements according to given selector to SVG icons.
 *
 * SymbolDefsPath is an SVG definition file which all SVGs are defined inside.
 * A prefix is required to capture the icon code by regular expression.
 * A selector must be given to get all proper elements that will be converted into SVG icon.
 * Requires a defined icon code list to ensure parsing.
 */
export class SvgRenderer {
  private _mutationObserver: MutationObserver;

  constructor(private symbolDefsPath: string,
              private prefix: string,
              private selector: string,
              private iconCodes: string[]) {
  }

  /**
   * Start observing changes on given element to render continuously the icons
   */
  startObserving(html: Element) {
    this.render(html);
    this._mutationObserver = new MutationObserver(this._observerCallback.bind(this));
    this._mutationObserver.observe(html, {childList: true, subtree: true});
  }

  /**
   * Stop observing the element.
   */
  stopObserving() {
    if (this._mutationObserver) this._mutationObserver.disconnect();
  }

  /**
   * Render proper elements (according to selector) to relevant svg icons
   */
  render(html: Element) {
    const nodeList = html.querySelectorAll(this.selector);

    for (let i = 0, l = nodeList.length; i < l; i++)
      this._convertSvg(nodeList.item(i));
  }

  /**
   * Mutation observer callback.
   */
  private _observerCallback(mutations: MutationRecord[]) {
    mutations.forEach(mutation => {
      for (let i = 0, nodeList = mutation.addedNodes, l = nodeList.length; i < l; i++) {
        const node = nodeList.item(i);
        if (node instanceof Element) this.render(node);
      }
    });
  }

  /**
   * Generate SVG from given element's attributes, then take element in HTML comment block.
   */
  private _convertSvg(el: Element): void {
    const iconCode = this._parseIconCode(el);

    if (!iconCode) return;

    const svg = document.createElement('svg');

    for (let i = 0, attributes = el.attributes, l = attributes.length; i < l; i++)
      svg.setAttribute(attributes[i].name, attributes[i].value);

    svg.innerHTML = `<use xlink:href="${this.symbolDefsPath}#${iconCode}"></use>`;
    el.outerHTML = svg.outerHTML + `\n<!--${el.outerHTML}-->`;
  }

  /**
   * Parse icon code from class of element
   */
  private _parseIconCode(el: Element): string | null {
    for (let i = 0, l = el.classList.length; i < l; i++) {
      const matches = new RegExp(this.prefix + '(\\w+)').exec(el.classList.item(i));
      if (matches && this.iconCodes.indexOf(matches[1]) !== -1) {
        return matches[0];
      }
    }
    return null;
  }
}
