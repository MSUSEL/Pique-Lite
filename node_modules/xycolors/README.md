# xycolors 🌈

[![NPM version](https://img.shields.io/npm/v/xycolors?color=a1b858&label=)](https://www.npmjs.com/package/xycolors)

> A tiny and fast package for adding colors to your terminal output.
>
> Based on [yoctocolors](https://github.com/sindresorhus/yoctocolors)

## Highlights

- Tiny
- Fast
- Handles nested colors
- Tree-shakeable
- No dependencies
- Actively maintained

## Install

```sh
npm install xycolors
```

## Usage

```js
import * as c from 'xycolors'

console.log(c.red('Yo!'))

console.log(c.blue(`Welcome to the ${colors.magenta('xycolors')} package!`))
```

_This package supports [basic color detection](https://nodejs.org/api/tty.html#writestreamhascolorscount-env). Colors can be forcefully enabled by setting the `FORCE_COLOR` environment variable to `1` and can be forcefully disabled by setting `NO_COLOR` or `NODE_DISABLE_COLORS` to any value. [More info.](https://nodejs.org/api/tty.html#writestreamgetcolordepthenv)_

## Styles

### Modifiers

- `reset` - Reset the current style.
- `bold` - Make the text bold.
- `dim` - Make the text have lower opacity.
- `italic` - Make the text italic. _(Not widely supported)_
- `underline` - Put a horizontal line above the text. _(Not widely supported)_
- `overline` - Put a horizontal line below the text. _(Not widely supported)_
- `inverse`- Invert background and foreground colors.
- `hidden` - Print the text but make it invisible.
- `strikethrough` - Put a horizontal line through the center of the text. _(Not widely supported)_

### Colors

- `black`
- `red`
- `green`
- `yellow`
- `blue`
- `magenta`
- `cyan`
- `white`
- `gray`
- `redBright`
- `greenBright`
- `yellowBright`
- `blueBright`
- `magentaBright`
- `cyanBright`
- `whiteBright`
- `blackStylize`
- `blackSecondaryStylize`
- `redStylize`
- `redSecondaryStylize`
- `greenStylize`
- `greenSecondaryStylize`
- `yellowStylize`
- `yellowSecondaryStylize`
- `blueStylize`
- `blueSecondaryStylize`
- `magentaStylize`
- `magentaSecondaryStylize`
- `pinkStylize`
- `pinkSecondaryStylize`
- `cyanStylize`
- `cyanSecondaryStylize`
- `whiteStylize`
- `whiteSecondaryStylize`
- `grayStylize`
- `graySecondaryStylize`

### Background colors

- `bgBlack`
- `bgRed`
- `bgGreen`
- `bgYellow`
- `bgBlue`
- `bgMagenta`
- `bgCyan`
- `bgWhite`
- `bgGray`
- `bgRedBright`
- `bgGreenBright`
- `bgYellowBright`
- `bgBlueBright`
- `bgMagentaBright`
- `bgCyanBright`
- `bgWhiteBright`

### TrueColor

You can use the `hex` or `rgb` format.

Foreground function: `hex()` `rgb()`
Background function: `bgHex()` `bgRgb()`

```ts
import { bgHex, bgRgb, hex, rgb } from 'xycolors'

// foreground color
hex('#E0115F')('Ruby')
hex('#96C')('Amethyst')
rgb(224, 17, 95)('Ruby')

// background color
bgHex('#E0115F')('Ruby')
bgHex('#96C')('Amethyst')
bgRgb(224, 17, 95)('Ruby')
```

## Benchmark

```sh
$ ./benchmark.js
┌─────────┬────────────────┬─────────────┐
│ (index) │    library     │   ops/sec   │
├─────────┼────────────────┼─────────────┤
│    0    │   'xycolors'   │ '8,000,000' │
│    1    │  'picocolors'  │ '8,000,000' │
│    2    │  'colorette'   │ '6,024,096' │
│    3    │ 'kleur/colors' │ '4,807,692' │
│    4    │  'nanocolors'  │ '4,807,692' │
│    5    │    'chalk'     │ '4,000,000' │
│    6    │    'kleur'     │ '4,000,000' │
│    7    │ 'ansi-colors'  │ '1,848,429' │
│    8    │  'cli-color'   │  '585,480'  │
└─────────┴────────────────┴─────────────┘
```

_See [benchmark.js](benchmark.js)._

## License

[MIT](./LICENSE) License © 2024 [xinyao27](https://github.com/xinyao27)
