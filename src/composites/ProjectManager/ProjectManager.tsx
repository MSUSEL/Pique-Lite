import { Grid } from "@radix-ui/themes";
import { ProjectSidebar } from "./ProjectSidebar";
import { ProjectContent } from "./ProjectContent";
import { ProjectManagerProvider } from "./ProjectManagerContext";

export const ProjectManager = () => {
  return (
    <ProjectManagerProvider>
      <Grid columns="1fr 3fr" className="ProjectManager-root" height="100%">
        <ProjectSidebar />
        <ProjectContent />
      </Grid>
    </ProjectManagerProvider>
  );
};
