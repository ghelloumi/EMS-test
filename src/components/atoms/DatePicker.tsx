import React, {useEffect, useRef} from "react";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface DatePickerType {
    label: string,
    handleChange: any,
    value: string,
    maxDate?: string,
    minDate?: string
    testId: string
}

const useDatePickerStyles = makeStyles({
    root: {
        margin: 20,
        width: "50%"
    }
})

export const DatePicker: React.FC<DatePickerType> = ({label, handleChange, value, minDate, maxDate, testId}) => {
    const classes = useDatePickerStyles();
    const ref = useRef();

    useEffect(() => {
        if (ref?.current) {
            if (maxDate) {
                // @ts-ignore
                ref.current?.setAttribute('max', maxDate)
            }

            if (minDate) {
                // @ts-ignore
                ref.current?.setAttribute('min', minDate)
            }
        }
    }, [ref, minDate, maxDate]);


    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value
        handleChange(newDate)
    }

    return (
        <TextField
            inputRef={ref}
            className={classes.root}
            id="range-date-picker"
            label={label}
            type="date"
            onChange={handleChangeDate}
            value={value}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                // @ts-ignore
                'data-testid': testId
            }}
        />
    );
};
