import { useEffect } from "react";
import { useProjectState } from "./composites/ProjectManager/hooks/use-project-state";
import { Project, Projects } from "./state";
import mockData from "./assets/pique-lite-data/mock-data-no-dates.json";

export const getLiteMockData = () => {
  const projects = mockData;

  Object.keys(projects).forEach((key) => {
    const project = projects[key] as Project;
    project.versions.forEach((version) => {
      version.date = new Date(version.date);
    });
  });

  return projects as unknown as Projects;
};

export const MockData = ({}: { folders?: string[] }) => {
  const { projects, createNewProject, setProjects } = useProjectState();

  useEffect(() => {
    const projectsData = getLiteMockData();
    setProjects(projectsData);
    Object.keys(projects).forEach((key) => {
      const project = projects[key] as Project;
      console.log(project.versions[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render anything
};
