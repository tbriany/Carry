
//state = initialState null object
export const LoginReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: {
                    isAnon: false,
                    info: action.payload
                }
            }
        case 'REMOVE_USER':
            return {
                ...state,
                user: {
                    isAnon: true,
                    info: action.payload
                }
            }
        case 'USER_CLICKED_UPDATE':
            return {
                ...state,
                user: {
                    isAnon: false,
                    info: action.payload
                }
            }
    }
};

//loginReducer 

// cycle
//dispatchers: (takes action) (modify global state) (provide new state)
// provider(store-gives info to app) and consumers(consume data)

// action login
// logout
// signup
// edit info
