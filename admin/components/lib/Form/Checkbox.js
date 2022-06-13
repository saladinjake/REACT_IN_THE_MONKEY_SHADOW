import { Checkbox as CheckboxUI } from "@chakra-ui/checkbox";

export const Checkbox = ({ isChecked, onChange, label, rest }) => {
  return (
    <CheckboxUI
      py={3}
      size="lg"
      colorScheme="green"
      isChecked={isChecked}
      onChange={onChange}
      {...rest}
    >
      {label}
    </CheckboxUI>
  );
};
