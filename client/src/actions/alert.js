import  {SET_ALERT,REMOVE_ALERT} from './type';
import uuid from 'uuid';


export const setAlert =(msg,alrtype,timeout) => dispatch=>{
    const id =uuid.v4();
    dispatch({
        type:SET_ALERT,
        payload:{
            msg,alrtype,id
        }
    });
    setTimeout(()=>
    dispatch({
        type:REMOVE_ALERT,
        payload:{
            id
        }
    }),timeout);
}