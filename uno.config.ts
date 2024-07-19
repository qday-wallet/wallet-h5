import { defineConfig, presetUno, presetIcons } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
export default defineConfig({
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|scss)($|\?)/,
        // include js/ts files
        "src/**/*.{js,ts,scss,css}",
      ],
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
});
