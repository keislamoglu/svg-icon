# svg-icon
Font Awesome-like usage for SVG

## Usage

```typescript
import {SvgIcon, Config} from './path/to/svg-icon';

const config: Config = {
    prefix: 'icon-',
    iconCodes: ['bird', 'car', 'plane'],
    selector: 'i.icon',
    symbolDefsPath: 'assets/svg/symbol-defs.svg'
};

const svgicon = new SvgIcon(config);

const html = `
<div>
  <i class="icon icon-bird"></i>
</div>
`;

// Render for once
svgicon.renderOnce(html);

// Or observe and render continiously
svgicon.startObserving(html);

// The output will be a bird icon which has been already defined in svg definitions
```
