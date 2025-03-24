import { Box, Flex, Text } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { ProjectAttributesChart } from "./ProjectAttributesChart";
import { RiskLegend } from "./RiskCards";
import { getAllRiskLevels } from "../../composites/RiskHelpers";
import * as ProjectPanel from "./ProjectPanel";
import { useMemo } from "react";
import { useAtom } from "jotai/react";
import { State } from "../../state";
import { LabelledComboBox } from "../../composites/Combobox";

export const RiskLevelLegend = () => {
  const allRisks = getAllRiskLevels();

  return (
    <RiskLegend
      risks={allRisks.map((risk) => ({
        title: risk.name,
        score: risk.diagnosticRange[1] - 0.001,
      }))}
      scale="diagnostic"
    />
  );
};

const ProjectCharacteristicsRisks = () => {
  const projects = useAtomValue(State.projects);
  const selectedProject = useAtomValue(State.selectedProject);
  const selectedVersion = useAtomValue(State.selectedVersion);

  //check to make sure there is a selected project
  if (!selectedProject) return null;
  const project = projects ? projects[selectedProject] : undefined;

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

  return <RiskLegend risks={riskCards} scale="normal" />;
};

function ProjectDetailsView() {
  const projectMapping = useAtomValue(State.projects);

  const projects = useMemo(() => {
    if (!projectMapping) return [];
    return Object.values(projectMapping);
  }, [projectMapping]);

  const [selectedProjectId, setSelectedProjectId] = useAtom(
    State.selectedProject
  );
  const [selectedVersion, setSelectedVersion] = useAtom(State.selectedVersion);

  const selectedProject =
    projects.find((project) => project.uuid === selectedProjectId) || null;

  const versions = useMemo(() => {
    if (!selectedProject) return [];
    return selectedProject.versions;
  }, [selectedProject]);

  return (
    <Flex
      className="ProjectDetailsView-root"
      direction="column"
      align="start"
      width="100%"
      height="100%"
      gap="6"
      justify="start"
      style={{
        padding: "1em",
      }}
    >
      <Flex direction="row" width="100%" gap="6">
        <LabelledComboBox
          label="Project"
          getOptionKey={(project) => project.uuid}
          getOptionLabel={(project) => project.name}
          options={projects}
          value={selectedProject}
          onChange={(project) => setSelectedProjectId(project?.uuid || "")}
        />
        <LabelledComboBox
          label="Version"
          options={versions}
          value={versions[selectedVersion]! || undefined}
          getOptionKey={(version) => version.name}
          getOptionLabel={(version) => version.name}
          onChange={(version) =>
            setSelectedVersion(version ? versions.indexOf(version) : undefined)
          }
        />
      </Flex>
      <Flex justify="center" direction="row" align="center" gap="6">
        <Text style={{ display: "block", whiteSpace: "nowrap" }}>
          Risk Status
        </Text>
        <ProjectCharacteristicsRisks />
      </Flex>
      <Box>
        <ProjectPanel.Container>
          <ProjectPanel.Title>Characteristics</ProjectPanel.Title>
          <ProjectAttributesChart />
        </ProjectPanel.Container>
      </Box>
    </Flex>
  );
}

export default ProjectDetailsView;
