export const checkValidEmail = (input, errorFunction) => {
    if (input.length === 0 || !input.includes('@') || !input.includes('.')) {
        errorFunction(true, 'Please enter a valid email');
    }
    else {
        errorFunction(false, '')
    };
};
export const checkValidPassword = (input, errorFunction) => {
    if (input.length === 0) {
        errorFunction(true, 'Please enter a valid password')
    }
    else {
        errorFunction(false, '')
    }
};

export const checkEmptyInput = (input, errorFunction, type) => {
    if (input.length === 0) {
        errorFunction(true, `Please enter a valid ${type}`, type)
    }
    else {
        errorFunction(false, '', type)
    }
};