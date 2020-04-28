import { useState } from 'react';
import { checkValidEmail, checkValidPassword } from './inputHelpers';

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

export const usePassword = (initalValue) => {
    const [ password, setPassword ] = useState(initalValue);
    const handleChange = (key) => (e) => {
        setPassword({...password, [key]: e.target.value})
    }
    return {
        password,
        onChange: handleChange,
    }
}