import { Controller } from "react-hook-form";
import {Checkbox, FormControl, FormControlLabel, FormLabel} from "@mui/material";


export const FormInputCheckbox = ({name, control, label, disabled}) => {
    return (
        
        <FormControl size="small" variant="outlined" fullWidth>
            <FormControlLabel control={
                <Controller name={name} control={control} render={({field}) => {                        
            return (
                <Checkbox
                disabled={disabled}
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value} >
                </Checkbox>
            );
        }}
        
        />
            }
            label={label}></FormControlLabel>
            
        </FormControl>
        
        
                
    )
}