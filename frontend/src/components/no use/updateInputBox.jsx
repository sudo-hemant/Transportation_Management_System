import React from 'react'


function UpdateInputBox({ type, name, value, onChange }) {

    return (
        <>
            <input type={type} name={name} value={value} onChange={onChange} />
        </>
    )
}

export default UpdateInputBox
