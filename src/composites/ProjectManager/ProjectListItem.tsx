import { Layers, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { useState } from "react";

interface ProjectListItemProps {
  name: string;
  onClick?: () => void;
  onEditName?: (newName: string) => void;
  canEdit?: boolean;
  isSelected?: boolean;
}

export const ProjectListItem = ({
  name,
  onClick,
  onEditName,
  canEdit = true,
  isSelected = false
}: ProjectListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
    if (onEditName && editedName !== name) {
      onEditName(editedName);
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] items-center gap-2",
        isSelected ? "bg-gray-200" : "transparent"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: onClick ? "pointer" : "default",
        padding: "6px",
        borderRadius: "4px"
      }}
    >
      <Layers className="h-4 w-4" />
      {isEditing ? (
        <Input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleEditComplete}
          onKeyDown={(e) => e.key === "Enter" && handleEditComplete()}
          autoFocus
          style={{ width: "fit-content", margin: 0 }}
        />
      ) : (
        <span>{name}</span>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleEditClick}
        style={{
          visibility: isHovered && !isEditing && canEdit ? "visible" : "hidden"
        }}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
};
