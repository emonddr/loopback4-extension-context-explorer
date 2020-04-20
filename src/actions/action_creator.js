'use strict'

import {  SET_SELECTED_ITEM, CLEAR_SELECTED_ITEM, SET_REQUEST_BINDING_DATA, SET_SERVER_BINDING_DATA, SET_APPLICATION_BINDING_DATA } from './action_constants'


 export  function setSelectedItem( the_name, the_context_name , the_details, the_context_type) {
    return {
      type       : SET_SELECTED_ITEM,
      payload    :
       {
         selected_item  : {
                            name         : the_name,
                            context_name : the_context_name,
                            details      : the_details,
                            context_type : the_context_type
                         }
    
      }
    };

  }// setSelectedItem()

  export function clearSelectedItem() {

    return {
        type       : CLEAR_SELECTED_ITEM,
        payload    :
        {
          selected_item  : {}
       }
 
    };

    }// clearSelectedItem()

    export  function setRequestBindingData( the_data) {
      return {
        type       : SET_REQUEST_BINDING_DATA,
        payload    :
         {
          request_binding_data  : the_data
      
        }
      };
  
    }// setRequestBindingData()
  

    export  function setServerBindingData( the_data) {
      return {
        type       : SET_SERVER_BINDING_DATA,
        payload    :
         {
          server_binding_data  : the_data
      
        }
      };
  
    }// setServerBindingData()

    export  function setApplicationBindingData( the_data) {
      return {
        type       : SET_APPLICATION_BINDING_DATA,
        payload    :
         {
          application_binding_data  : the_data
      
        }
      };
  
    }// setApplicationBindingData()

      /*
        This action creator doesn't return an object, but a function that returns a function that can dispatch actions.
    */
   export const fetchInspectionData = () => {
        
    return (dispatch) =>  {


          

       //I only use this setTimeout function to create a delay, so that I can see the [Refresh] button animation occuring.
       setTimeout(function(){
   
        fetch("http://localhost:3000/inspect")
        .then(function(response) {
              
              return response.json();
          })
          .then(function(result) {
    
              
             let data = result;
             let requestBindingData = { name: data.name,bindings: data.bindings, type:"Request Context"};
             let serverBindingData  = { name: data.parent.name,bindings: data.parent.bindings, type:"Server Context"};
             let appBindingData     = { name: data.parent.parent.name,bindings: data.parent.parent.bindings, type:"Application Context"};
             dispatch(setRequestBindingData(requestBindingData));
             dispatch(setServerBindingData(serverBindingData));
             dispatch(setApplicationBindingData(appBindingData));
                 
            })
        .catch(function(error) {
             //dispatch - fetch failed
            console.log("Error retrieving data : " + error);

        });

        
       }, 1500);


              

    }// (dispatch) =>  {}

}//fetchInspectionData()

    
  
  

  

export default {   setSelectedItem, clearSelectedItem}