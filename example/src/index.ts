import './main.css';
import {SvgIcon} from "@keislamoglu/svg-icon";

const [iconCodes, symbolDefsPath, prefix, selector] = [
    require('../assets/icon-codes.json'),
    '../assets/icons.svg',
    'icon-',
    'i.icon'
];

const svgicon = new SvgIcon({iconCodes, symbolDefsPath, prefix, selector});

svgicon.startObserving(document.body);
