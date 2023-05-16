import { Box, TextField } from "@mui/material";
import { useState } from "react";

type FormFieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  formSubmitted: boolean;
};

export function FormField({
  label,
  id,
  value,
  onChange,
  error,
  onBlur,
  formSubmitted,
}: FormFieldProps) {
  const [touched, setTouched] = useState(false);

  return (
    <Box>
      <TextField
        label={label}
        id={id}
        value={value}
        onChange={onChange}
        error={(formSubmitted || touched) && Boolean(error)}
        helperText={(formSubmitted || touched) && error}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
      />
    </Box>
  );
}
