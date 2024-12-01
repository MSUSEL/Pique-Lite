import { Grid } from "@radix-ui/themes";
import { ProjectList } from "./ProjectList";
import { ProjectFiles } from "./ProjectFiles";
import { ProjectManagerProvider } from "./ProjectManagerContext";

export const ProjectManager = () => {
  return (
    <ProjectManagerProvider>
      <Grid columns="1fr 3fr" className="ProjectManager-root" height="100%">
        <ProjectList />
        <ProjectFiles />
      </Grid>
    </ProjectManagerProvider>
  );
};
