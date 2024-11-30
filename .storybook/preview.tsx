import React from "react";
import type { Preview } from "@storybook/react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <Theme>
      <Story />
    </Theme>
  ),
];
