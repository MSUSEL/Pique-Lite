import { useAtomValue, useAtom } from "jotai";
import { State } from "../state";
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@radix-ui/themes"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"

export function ProjectSelector() {
  const [open, setOpen] = React.useState(false)
  const projects = useAtomValue(State.projects);
  const [selectedProject, setSelectedProject] = useAtom(State.selectedProject);
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          style={{
            width: "200px",
            justifyContent: "space-between",
          }}
        >
          {selectedProject && projects
            ? projects[selectedProject].name
            : "Select project..."}
          <ChevronsUpDown style={{ marginLeft: "8px", height: "16px", width: "16px", flexShrink: 0, opacity: 0.5 }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: "200px", padding: "0", border: "1px solid var(--accent-a8)", borderRadius: "4px", backgroundColor: "var(--indigo-3)"}}>
        <Command>
          <CommandInput 
            placeholder="Search projects..." 
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid var(--accent-a8)",
              backgroundColor: "var(--indigo-1)",
              color: "var(--indigo-12)",
              width: "calc(100% - 32px)",
              margin: "8px",
              fontSize: "14px",
            }}
          />
          <div style={{ borderBottom: "1px solid var(--accent-a8)", margin: "0 8px" }}></div>
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projects && Object.values(projects).map((project) => (
                <CommandItem
                key={project.name}
                value={project.name}
                onSelect={(currentValue : string) => {
                  setSelectedProject(currentValue === selectedProject ? "" : currentValue)
                  setOpen(false)
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  backgroundColor: selectedProject === project.name ? "var(--indigo-4)" : "transparent",
                  color: "var(--indigo-12)",
                  fontSize: "14px",
                  transition: "background-color 0.2s ease",
                }}
                >
                {project.name}
                <Check
                  style={{
                  marginLeft: "auto",
                  height: "16px",
                  width: "16px",
                  flexShrink: 0,
                  opacity: selectedProject && projects[selectedProject].name === project.name ? 1 : 0
                  }}
                />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}