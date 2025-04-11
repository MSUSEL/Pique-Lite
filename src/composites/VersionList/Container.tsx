import { Version } from "../../state";
import { VersionListProvider } from "./context";
import { SearchHeader } from "./SearchHeader";
import { VersionTable } from "./VersionTable";
import { PaginationButtons } from "./PaginationButtons";

interface ContainerProps {
  versions: Version[];
  invalidFiles: { name: string; reason: string }[];
  onRemoveVersion: (fileName: string) => void;
  onUpdateVersionVisibility: (fileName: string) => void;
  itemsPerPage?: number;
}

export const Container = ({
  versions,
  invalidFiles,
  onRemoveVersion,
  onUpdateVersionVisibility,
  itemsPerPage = 20
}: ContainerProps) => {
  return (
    <VersionListProvider
      versions={versions}
      invalidFiles={invalidFiles}
      onRemoveVersion={onRemoveVersion}
      onUpdateVersionVisibility={onUpdateVersionVisibility}
      itemsPerPage={itemsPerPage}
    >
      <div className="flex flex-col gap-4">
        <SearchHeader />
        <div className="min-h-0 flex-1">
          <VersionTable />
        </div>
        <div className="flex justify-center">
          <PaginationButtons />
        </div>
      </div>
    </VersionListProvider>
  );
};
