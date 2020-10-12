const SET_STATUS_CODE = 'SET_STATUS_CODE';
const SET_HTTP_META = 'SET_HTTP_META';

const initialState = {
    httpErrorStatusCode: 404,
    failedHttpQueryMetaData: null
}


const errorsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_STATUS_CODE:
            return {...state, httpErrorStatusCode: action.payload}

        case SET_HTTP_META:
            return {
                ...state, failedHttpQueryMetaData: action.payload
            }
        default:
            return state;
    }

}


export const changeHttpErrorStatus = (code) => dispatch =>
    dispatch(handleStatusCode(code))
export const handleHttpMeta = data => dispatch =>
    dispatch(handleHTTPMeta(data))

export const handleStatusCode = (payload) => ({type: SET_STATUS_CODE, payload});
export const handleHTTPMeta = (payload) => ({type: SET_HTTP_META, payload});
export default errorsReducer;





