import { useEffect } from "react";
import { useProjectState } from "./composites/ProjectManager/hooks/use-project-state";
import { base } from "./state/schema";

// Define an interface for the expected module structure
interface JsonModule {
  default: base.Schema;
}

export const MockData = () => {
  const { projects, createNewProject, addFilesToProject } = useProjectState();

  useEffect(() => {
    // Dynamically import all JSON files from the specified directory
    const modules = import.meta.glob<JsonModule>(
      "./assets/pique-lite-data/mock-data-with-dates/project_a/*.json",
      { eager: true }
    );

    const files = Object.entries(modules).map(([path, module]) => {
      const fileName = path.split("/").pop()?.replace(".json", "") || "unknown";
      const content = module.default; // Now correctly typed
      return {
        name: fileName,
        content: content,
        metadata: {
          name: fileName,
          // Use date from content if available, otherwise fallback to current date
          lastModified: content.date
            ? new Date(content.date).getTime()
            : Date.now()
        }
      };
    });


    if (files.length > 0) {
      const projectId = createNewProject();
      addFilesToProject(projectId, files);
      // Mark the project as selected, maybe? Or handle selection elsewhere.
      // setSelectedProject(projectId); // Optional: Select the new project
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render anything
};
