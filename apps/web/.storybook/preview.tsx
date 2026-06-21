import type { Preview } from "@storybook/nextjs-vite";
import "./fonts.css";
import "../app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="font-sans">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
