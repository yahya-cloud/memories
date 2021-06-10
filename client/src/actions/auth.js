import * as api from  '../api/index';
import {AUTH} from './actionTypes';

export const signIn = (formData, history) => async(dispatch) => {
    console.log(formData);
    try {
        const {data} = await api.signIn(formData);

        dispatch({type: AUTH, payload: data})

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, history) => async(dispatch) => {
    
    try { 

        const {data} = await api.signUp(formData);
        
        dispatch({type: AUTH, payload: data})

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}
