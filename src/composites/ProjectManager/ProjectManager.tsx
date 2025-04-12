import { ProjectSidebar } from "./ProjectSidebar";
import { ProjectContent } from "./ProjectContent";
import { ProjectManagerProvider } from "./ProjectManagerContext";

export const ProjectManager = () => {
  return (
    <ProjectManagerProvider>
      <div className="grid grid-cols-[1fr_3fr] h-full">
        <ProjectSidebar />
        <ProjectContent />
      </div>
    </ProjectManagerProvider>
  );
};
