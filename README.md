# svgicon
Font Awesome-like usage for SVG

## Usage

```typescript
const symbolDefs = 'assets/svg/symbol-defs.svg';
const prefix = 'icon-';
const selector = 'i.icon'; // Means the renderer will catch <i> tags having "icon" class.
const iconCodes = ['bird', 'car', 'plane'];

const renderer = new SvgRenderer(symbolDefs, prefix, selector, iconCodes);

const html = `
<div>
  <i class="icon icon-bird"></i>
</div>
`;

// Render for once
renderer.render(html);

// Or observe and render continiously
renderer.startObserving(html);
```
