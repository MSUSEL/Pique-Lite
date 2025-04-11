import { InitialProjectSetupDialog } from "./InitialProjectSetupDialog.tsx";
import { useState } from "react";
import { FileTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";
import { ProjectManagerProvider } from "../../composites/ProjectManager/ProjectManagerContext.tsx";

function Landing() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div>
        <div>
          <img
            src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg"
            alt="CISA Logo"
            width="100"
            height="100"
            style={{ marginRight: "20px" }}
          />
          <span>PIQUE LITE</span>
          <img
            src="https://raw.githubusercontent.com/MSUSEL/msusel-pique-visualizer/refactorZiyi/src/assets/PIQUE_svg.svg"
            alt="PIQUE Logo"
            width="100"
            height="100"
            style={{ marginLeft: "20px" }}
          />
        </div>

        <ProjectManagerProvider>
          <Dialog className="max-w-[1200px]">
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileTextIcon width="16" height="16" />
                Get Started
              </Button>
            </DialogTrigger>
            <InitialProjectSetupDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
            />
          </Dialog>
        </ProjectManagerProvider>
      </div>
    </div>
  );
}

export default Landing;
