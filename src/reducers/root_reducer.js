'use strict'

import { SET_SELECTED_ITEM,CLEAR_SELECTED_ITEM }  from '../actions/action_constants'

const initialState = { "selectedItem":{} };

export default function rootReducer(state = initialState, action) {

    var newState=null;

    
    switch (action.type) {


      case SET_SELECTED_ITEM:
        newState =  Object.assign({}, state, { "selectedItem" : action.payload.selected_item } );        
        return newState;

      case CLEAR_SELECTED_ITEM:
        newState =  Object.assign({}, state, { "selectedItem" : {} } );        
        return newState;

      default:
        return state;
    }//switch

  }//rootReducer()


  