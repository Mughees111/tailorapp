import createDataContext from "./createDataContext";
import { useColorScheme } from 'react-native'
// import React from 'react'



const dataReducer = (state, action) => {
    switch (action.type) {
        case 'setUserData':
            return { ...state, userData: action.payload }
        case 'setUserLocation':
            return { ...state, userLocation: action.payload }
        case 'setUserLanguage':
            return { ...state, userLanguage: action.payload }
        case 'changeAppTheme':
            return { ...state, theme: action.payload }

        default: return state
    }

}


const setUserGlobal = dispatch => {
    return (data) => {
        dispatch({ type: 'setUserData', payload: data })
    }
}

const setUserLocationGlobal = (dispatch) => {
    return (data) => {
        dispatch({ type: 'setUserLocation', payload: data })
    }
}


const setAppTheme = dispatch => {
    return (data) => {
        dispatch({ type: 'changeAppTheme', payload: data })
    }
}

const setUserLanguage = dispatch => {
    return (data) => {
        dispatch({ type: 'setUserLanguage', payload: data })
    }
}


export const { Provider, Context } = createDataContext(
    dataReducer,
    {
        setUserGlobal,
        setUserLocationGlobal,
        setAppTheme

    },
    {
        userData: [],
        userLocation: {},
        userLanguage: 'en',
        theme: 'light'
    }
)