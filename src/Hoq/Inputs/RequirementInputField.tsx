import { TextField } from "@mui/material";

interface RequirementInputFieldProps {
    value: string;
    onChange?: (newValue: string) => void;
}

export default function RequirementInputField({value, onChange}: RequirementInputFieldProps): React.JSX.Element {

    return <TextField 
        defaultValue={value} 
        variant="outlined" 
        size="small" 
        multiline 
        fullWidth
        onChange={(e) => onChange && onChange(e.target.value)}
        sx={{ 
            "& .MuiOutlinedInput-root": { padding: 0 },
            "& .MuiOutlinedInput-notchedOutline": { border: "none", padding: 0 },
            "& .MuiOutlinedInput-input": { fontSize: "0.875rem" }
        }} />
}

