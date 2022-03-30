import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  rules: [
    [
      /^font-manrope$/,
      () => ({
        'font-family': `Manrope`,
      }),
    ],
  ],
});
