import  {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR} from './type';
import axios from 'axios';
import {setAlert} from './alert'

export const registeract =({name,email,password}) => async dispatch=>{
     try{
            const config ={
                headers: {
                'Content-Type':'application/json'
                }
            }
            const body = JSON.stringify({name,email,password});
            const res =await axios.post('api/users',body,config);
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            });
            console.log(res.data);
        }catch(err){
            console.log(err.response.data.errors);
            const errors =err.response.data.errors;
            if(errors){
                errors.forEach(err => 
                    dispatch(setAlert(err.msg,'danger',2000))
                );
                dispatch({
                    type:REGISTER_FAIL
                });
            }
           
            
        }
    // const id =uuid.v4();
    
    // setTimeout(()=>
    // dispatch({
    //     type:REMOVE_ALERT,
    //     payload:{
    //         id
    //     }
    // }),timeout);
}

export const loaduser =() => async dispatch=>{

}