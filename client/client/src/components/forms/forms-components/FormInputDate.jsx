import React, {useState} from 'react';
import { Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const FormInputDate = ({control, name}) => {

    return (
        <Controller
            control={control}
            name={name}
            rules={{required: true}}
            render={({field}) => (
                <DatePicker
                    shouldCloseOnSelect={true}
                    {...field}
                    dateFormat={'dd MMM yyy'}
                    showTimeSelect={false}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    placeholderText='Select Subscription Date'
                />
            )}
        >
            
        </Controller>
    );
};

export default FormInputDate;