import type { Meta, StoryObj } from "@storybook/react";
import { ProjectManager } from "./ProjectManager";
import { MockData } from "../../MockData";

const StateDebugger = () => {
  return <div>Hello</div>;
};

const meta = {
  title: "Composites/ProjectManager",
  component: ProjectManager,
  parameters: {
    layout: "centered"
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        {/* <StateDebugger /> */}
        <MockData />
      </div>
    )
  ]
} satisfies Meta<typeof ProjectManager>;

export default meta;
type Story = StoryObj<typeof ProjectManager>;

export const Default: Story = {
  args: {}
};
