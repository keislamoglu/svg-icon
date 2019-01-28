"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvgRenderer = (function () {
    function SvgRenderer(config) {
        this.config = config;
    }
    SvgRenderer.prototype.convertSvg = function (el) {
        var iconCode = this._parseIconCode(el);
        if (!iconCode)
            return;
        var svg = document.createElement('svg');
        for (var i = 0, attributes = el.attributes, l = attributes.length; i < l; i++)
            svg.setAttribute(attributes[i].name, attributes[i].value);
        svg.innerHTML = "<use href=\"" + this.config.symbolDefsPath + "#" + iconCode + "\"></use>";
        el.outerHTML = svg.outerHTML + ("\n<!--" + el.outerHTML + "-->");
    };
    SvgRenderer.prototype._parseIconCode = function (el) {
        for (var i = 0, l = el.classList.length; i < l; i++) {
            var matches = new RegExp(this.config.prefix + '(\\w+)').exec(el.classList.item(i));
            if (matches && this.config.iconCodes.indexOf(matches[1]) !== -1) {
                return matches[0];
            }
        }
        return null;
    };
    return SvgRenderer;
}());
exports.SvgRenderer = SvgRenderer;
//# sourceMappingURL=svg-renderer.js.map