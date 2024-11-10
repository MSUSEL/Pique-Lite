import { IconButton } from "@radix-ui/themes";
import { PinLeftIcon, PinRightIcon } from "@radix-ui/react-icons";

interface MenuToggleProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ collapsed, setCollapsed }) => (
  <IconButton
    size="3"
    variant="soft"
    style={{
      position: "absolute",
      top: "10vh",
      left: collapsed ? "10px" : "260px",
      zIndex: 2,
      transition: "left 0.3s ease-in-out",
    }}
    onClick={() => setCollapsed(!collapsed)}
  >
    {collapsed ? <PinLeftIcon /> : <PinRightIcon />}
  </IconButton>
);

export default MenuToggle;
