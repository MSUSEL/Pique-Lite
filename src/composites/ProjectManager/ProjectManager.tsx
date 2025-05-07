import { ProjectSidebar } from "./ProjectSidebar";
import { ProjectContent } from "./ProjectContent";
import { ProjectManagerProvider } from "./ProjectManagerContext";

export const ProjectManager = () => {
  return (
    <ProjectManagerProvider>
      <div className="grid h-full grid-cols-[1fr_3fr]">
        <ProjectSidebar />
        <div className="bg-white p-4">
          <ProjectContent />
        </div>
      </div>
    </ProjectManagerProvider>
  );
};
