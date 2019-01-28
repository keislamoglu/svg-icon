export interface Config {
    symbolDefsPath: string;
    prefix: string;
    iconCodes: string[];
}
export declare class SvgRenderer {
    private config;
    constructor(config: Config);
    convertSvg(el: Element): void;
    private _parseIconCode(el);
}
