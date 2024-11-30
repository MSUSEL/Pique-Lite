import { Command } from "cmdk";
import { useState } from "react";
import { Popover, Button, Box, Text, Flex } from "@radix-ui/themes";
import "./Combobox.styles.css";

interface ComboBoxProps<T> {
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  renderOption?: (option: T) => React.ReactNode;
  getOptionKey?: (option: T) => string | number;
  getOptionLabel?: (option: T) => string;
}

export function ComboBox<T>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  renderOption = (option) => getOptionLabel(option),
  getOptionKey = (option) => String(option),
  getOptionLabel = (option) => String(option),
}: ComboBoxProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedLabel = value ? getOptionLabel(value) : placeholder;
  return (
    <Box>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button variant="soft">{selectedLabel}</Button>
        </Popover.Trigger>

        <Popover.Content className="combobox-base" style={{ padding: 0 }}>
          <Command>
            <Command.Input autoFocus placeholder={placeholder} />

            <Command.List>
              <Command.Empty>No results found.</Command.Empty>

              {options.map((option) => (
                <Command.Item
                  key={getOptionKey(option)}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {renderOption(option)}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
}

export const LabelledComboBox = <T,>({
  label,
  flexProps,
  ...props
}: ComboBoxProps<T> & { label: string } & {
  flexProps?: React.CSSProperties;
}) => {
  return (
    <Flex direction={"row"} align="center" gap="3" {...flexProps}>
      <Text>{label}</Text>
      <ComboBox {...props} />
    </Flex>
  );
};
