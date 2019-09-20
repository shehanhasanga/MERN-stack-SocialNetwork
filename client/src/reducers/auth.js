import  {REGISTER_SUCCESS,REGISTER_FAIL} from '../actions/type';
const initialstate= {
    tocken : localStorage.getItem('token'),
    isauthenticated : false,
    landing : true,
    user : null
}

export default function (state = initialstate,action){
    const {type,payload}=action
    switch(type){
        case REGISTER_SUCCESS:
           
            localStorage.setItem('token',payload.tocken);
            return {
                ...state ,...payload ,isauthenticated:true, loading:false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state ,isauthenticated:false, loading:false,token:null
            }
        default :
            return state
    }
}