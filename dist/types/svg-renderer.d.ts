import 'svgxuse';
import { Renderer } from "./renderer.interface";
export interface RendererConfig {
    symbolDefsPath: string;
    prefix: string;
    iconCodes: string[];
}
export declare class SvgRenderer implements Renderer {
    private config;
    constructor(config: RendererConfig);
    convertSvg(el: Element): void;
    private _parseIconCode;
}
