import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export const SearchBar: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  hint: string;
}> = ({ searchQuery, setSearchQuery, hint }) => {
  return (
    <Command
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    >
      <CommandInput />
    </Command>
  );
};
