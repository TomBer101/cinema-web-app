import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";


export const FormInputText = ({name, control, label, required, rules = {}}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: {onChange, value},
                fieldState: {error},
                formState
            }) => (
                <TextField sx={{m: '15px 0'}}
                    helperText={error? error.message: null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    required={required}
                    variant="outlined" />
                    
            )}/>
    )
}