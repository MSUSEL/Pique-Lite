import { LayersIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Text, Flex, IconButton } from "@radix-ui/themes";
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
  isSelected = false,
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
    <Flex
      direction="row"
      gap="2"
      align="center"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: onClick ? "pointer" : "default",
        backgroundColor: isSelected ? "var(--gray-4)" : "transparent",
        padding: "6px",
        borderRadius: "4px",
      }}
    >
      <LayersIcon />
      {isEditing ? (
        <input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleEditComplete}
          onKeyDown={(e) => e.key === "Enter" && handleEditComplete()}
          autoFocus
        />
      ) : (
        <Text>{name}</Text>
      )}
      {isHovered && !isEditing && canEdit && (
        <IconButton variant="ghost" size="1" onClick={handleEditClick}>
          <Pencil1Icon />
        </IconButton>
      )}
    </Flex>
  );
};
