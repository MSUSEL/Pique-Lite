import type { Meta, StoryObj } from "@storybook/react";
import { ProjectManager } from "./ProjectManager";
import { useAtom } from "jotai";
import { State } from "../../state/core";
import { Box, Heading, Text } from "@radix-ui/themes";

const StateDebugger = () => {
  const [projects] = useAtom(State.projects);
  const [selectedProject] = useAtom(State.selectedProject);
  const [selectedVersion] = useAtom(State.selectedVersion);

  return (
    <Box style={{ marginTop: 20, padding: 12, border: "1px solid #ccc" }}>
      <Heading size="3">Debug State</Heading>
      <Text as="div">Projects: {Object.keys(projects || {}).length}</Text>
      <Text as="div">Selected Project: {selectedProject || "none"}</Text>
      <Text as="div">Selected Version: {selectedVersion ?? "none"}</Text>
      {selectedProject && projects?.[selectedProject] && (
        <Box style={{ marginTop: 8 }}>
          <Text as="div">
            Current Project Name: {projects[selectedProject].name}
          </Text>
          <Text as="div">
            Versions: {projects[selectedProject].versions.length}
          </Text>
        </Box>
      )}
    </Box>
  );
};

const meta = {
  title: "Composites/ProjectManager",
  component: ProjectManager,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <StateDebugger />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectManager>;

export default meta;
type Story = StoryObj<typeof ProjectManager>;

export const Default: Story = {
  args: {},
};
