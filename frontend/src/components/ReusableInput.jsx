import React from 'react'
import { TextField } from '@material-ui/core'


function ReusableInput({ type='text', name, label, onChange, required=true, error=false, help='', ...params }) {

    return (
        <>
            <TextField 
                required={required}
                type={type}
                name={name}
                label={label}
                variant="outlined"
                // id="outlined-basic"
                onChange={onChange}
                error={error}
                helperText={help}
                {...params}
            />
        </>
    )
}

export default ReusableInput
