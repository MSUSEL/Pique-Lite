import type { Meta, StoryObj } from "@storybook/react";
import { InitialProjectSetupDialog } from "./InitialProjectSetupDialog";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";
import { MockData } from "../../MockData";
import { ProjectManagerProvider } from "../../composites/ProjectManager/ProjectManagerContext.tsx";
import { FileTextIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const DialogDemo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <InitialProjectSetupDialog
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
  title: "Composites/InitialProjectSetupDialog",
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
} satisfies Meta<typeof InitialProjectSetupDialog>;

export default meta;
type Story = StoryObj<typeof InitialProjectSetupDialog>;

export const Default: Story = {
  args: {}
};
