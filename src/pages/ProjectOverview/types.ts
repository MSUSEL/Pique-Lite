import { Version } from "../../state";

export interface ProjectCardProps {
  uuid: string;
  project: {
    name: string;
    versions: Version[];
  };
  //version: Version;
  onProjectClick: (versionIndex: number) => void;
}
