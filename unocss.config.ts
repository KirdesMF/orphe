import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  rules: [
    [
      /^font-roboto$/,
      () => ({
        'font-family': `Roboto`,
      }),
    ],
    [
      /^font-manrope$/,
      () => ({
        'font-family': `Manrope`,
      }),
    ],
    [
      /^text-clamp-(xs|sm|md|lg|xl|2xl|3xl|4xl)$/,
      (match) => ({
        'font-size': `var(--step-${match[1]})`,
      }),
    ],
  ],
});
