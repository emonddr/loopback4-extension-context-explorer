'use strict'

import { SET_SELECTED_ITEM,CLEAR_SELECTED_ITEM, SET_REQUEST_BINDING_DATA, SET_SERVER_BINDING_DATA, SET_APPLICATION_BINDING_DATA }  from '../actions/action_constants'

const initialState = { "selectedItem":{}, "requestBindingData":{}, "serverBindingData":{}, "applicationBindingData":{}};

export default function rootReducer(state = initialState, action) {

    var newState=null;

    
    switch (action.type) {


      case SET_SELECTED_ITEM:
        newState =  Object.assign({}, state, { "selectedItem" : action.payload.selected_item } );        
        return newState;

      case CLEAR_SELECTED_ITEM:
        newState =  Object.assign({}, state, { "selectedItem" : {} } );        
        return newState;

        case SET_REQUEST_BINDING_DATA:
          newState =  Object.assign({}, state, { "requestBindingData" : action.payload.request_binding_data } );        
          return newState;

        case SET_SERVER_BINDING_DATA:
        newState =  Object.assign({}, state, { "serverBindingData" : action.payload.server_binding_data } );        
        return newState;

        case SET_APPLICATION_BINDING_DATA:
          newState =  Object.assign({}, state, { "applicationBindingData" : action.payload.application_binding_data } );        
          return newState;
  
      default:
        return state;
    }//switch

  }//rootReducer()


  