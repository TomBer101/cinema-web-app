import { Controller } from 'react-hook-form'
import { Select, FormControl, FormControlLabel, FormLabel, MenuItem, InputLabel } from '@mui/material'

export const FormInputSelect = ({name, control, label, options}) => {
    return (
        <FormControl size='small' variant='outlined' fullWidth><InputLabel>{label}</InputLabel>
            <FormControlLabel  control={
                
                <Controller name={name} control={control} render={({field}) => {
                    return (
                        <Select 
                            label={label}
                            onChange={field.onChange}
                            value={field.value}
                            fullWidth
                        >
                            {
                                options?.map((option, index) => {
                                    return (
                                        <MenuItem key={index} value={option.id}>
                                            {option['name']}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    )
                }} />
            }
             />
        </FormControl>
    )
}

