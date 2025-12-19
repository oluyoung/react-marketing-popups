import type { StorybookConfig } from '@storybook/react-vite';
import { globbySync } from "globby";

const config: StorybookConfig = {
  // "stories": [
  //   "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  // ],
  "stories": globbySync([`../src/stories/**/*.stories.@(js|jsx|ts|tsx)`, "!../**/node_modules/**/*",], { cwd: "./.storybook" }),
  "addons": [],
  "framework": "@storybook/react-vite"
};

export default config;