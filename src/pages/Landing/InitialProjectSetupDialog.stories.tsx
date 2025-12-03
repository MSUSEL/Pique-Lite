import type { Meta, StoryObj } from "@storybook/react";
import { ProjectManagerDialog } from "../../composites/ProjectManager/ProjectManagerDialog";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";
import { MockData } from "../../MockData";
import { ProjectManagerProvider } from "../../composites/ProjectManager/ProjectManagerContext.tsx";
import { FileTextIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const DialogDemo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <ProjectManagerDialog
      onContinue={() => setDialogOpen(false)}
      trigger={
        <Button variant="outline">
          <FileTextIcon width="16" height="16" />
          Get Started
        </Button>
      }
      triggerAsChild
    />
  );
};

const meta = {
  title: "Composites/ProjectManagerDialog",
  component: DialogDemo,
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
} satisfies Meta<typeof ProjectManagerDialog>;

export default meta;
type Story = StoryObj<typeof ProjectManagerDialog>;

export const Default: Story = {
  args: {}
};
