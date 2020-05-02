import { useState } from 'react';

export const useInput = (initalValue) => {
    const [ value, setValue ] = useState(initalValue);
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return { 
        value,
        onChange: handleChange
    }
};