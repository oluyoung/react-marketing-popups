/// <reference types="vitest/config" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { fileURLToPath } from "node:url";
// import { globSync } from 'glob';
import dts from "vite-plugin-dts";
import treeShakeable from "rollup-plugin-tree-shakeable";

// https://vite.dev/config/
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      include: [
        "src/components/**/*.{ts,tsx}",
        "src/hooks/*.ts",
        "src/types.ts",
        "src/index.ts",
      ],
      tsconfigPath: "tsconfig.app.json",
    }),
    treeShakeable(),
  ],
  build: {
    sourcemap: true,
    // emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactMarketingPopups",
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        if (entryName.includes("src/index")) {
          return `index.${format === "es" ? "js" : "cjs"}`;
        }
        return `${entryName}.${format === "es" ? "js" : "cjs"}`;
      },
      cssFileName: 'react-marketing-popups'
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
        preserveModules: true,
        // assetFileNames: "assets/[name][extname]",
        // entryFileNames: "[name].js",
      },
      // input: Object.fromEntries(globSync(['src/components/**/*.{ts,tsx}', 'src/hooks/**/*.ts', 'src/index.ts']).map(file => {
      //   // This remove `src/` as well as the file extension from each
      //   // file, so e.g. src/nested/foo.js becomes nested/foo
      //   const entryName = path.relative('src', file.slice(0, file.length - path.extname(file).length));
      //   // This expands the relative paths to absolute paths, so e.g.
      //   // src/nested/foo becomes /project/src/nested/foo.js
      //   const entryUrl = fileURLToPath(new URL(file, import.meta.url));
      //   return [entryName, entryUrl];
      // }))
    },
  },
  test: {
    // projects: [{
    //   extends: true,
    //   plugins: [
    //   // The plugin will run tests for the stories defined in your Storybook config
    //   // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    //   storybookTest({
    //     configDir: path.join(dirname, '.storybook')
    //   })],
    //   test: {
    //     name: 'storybook',
    //     browser: {
    //       enabled: true,
    //       headless: true,
    //       provider: playwright({}),
    //       instances: [{
    //         browser: 'chromium'
    //       }]
    //     },
    //     setupFiles: ['.storybook/vitest.setup.ts']
    //   }
    // }],
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false,
    coverage: {
      include: ["src/components"],
      exclude: ["**/*.stories.tsx"],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
