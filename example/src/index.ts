import './main.css';
import {SvgIcon, SvgRenderer} from "@keislamoglu/svg-icon";

const [iconCodes, symbolDefsPath, prefix] = [
    require('../assets/icon-codes.json'),
    '../assets/icons.svg',
    'icon-',
    'i.icon'
];

const renderer = new SvgRenderer({iconCodes, symbolDefsPath, prefix});

const svgicon = new SvgIcon(renderer, 'i.icon');

svgicon.startObserving(document.body);
