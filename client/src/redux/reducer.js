import {combineReducers} from 'redux';
let refreshReducer = (state,action)=>{
    switch(action.type){
        case 'REFRESH':
            return action.payload.setrender(!(action.payload.Render));
    }
}

const rootReducer = combineReducers({
    refreshReducer
})

export default rootReducer;