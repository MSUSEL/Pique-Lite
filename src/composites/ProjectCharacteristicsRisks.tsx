import { useAtomValue } from "jotai";
import { RiskCards } from "./RiskCards";
import { State } from "../state";


function ProjectCharacteristicsRisks() {
  const projects = useAtomValue(State.projects);
  const selectedProject = useAtomValue(State.selectedProject);

  //check to make sure there is a selected project
  if (!selectedProject) return null;
  const project = projects ? projects[selectedProject] : undefined;

  const selectedVersion = useAtomValue(State.selectedVersion);

  if (!project) return null;

  const version =
    project.versions[selectedVersion == undefined ? 0 : selectedVersion];
  const characteristics = version.data.children;

  const riskCards = characteristics.map(
    (characteristic: { name: string; value: number }) => ({
      title: characteristic.name,
      score: characteristic.value,
    })
  );

  return <RiskCards risks={riskCards} />;
};

export default ProjectCharacteristicsRisks;