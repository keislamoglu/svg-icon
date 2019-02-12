# svg-icon
Font Awesome-like usage for SVG

## Usage

HTML:
```html
<div class="content">
    <i class="icon icon-bird"></i>
</div>
```

Script:
```typescript
import {SvgIcon, SvgRenderer} from '@keislamoglu/svg-icon';

const renderer = new SvgRenderer({ prefix: 'icon-', iconCodes: ['bird'], symbolDefsPath: 'assets/svg/icons.svg' });

const svgicon = new SvgIcon(renderer, 'i.icon');

// Render for once
svgicon.renderOnce(document.body);

// Or observe and render continiously
svgicon.startObserving(document.body);

// The output will be a bird icon which has been already defined in svg definitions file icons.svg
```

## Tips
- If you have separated SVG files, you can use http://fontastic.me/ to collect all in a file.
- You can use the following css to arrange icon size using 'font-size' property:
```css
.icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
    vertical-align: -.125em;
    font-size: 1rem;
}
```
