'use strict'

import {  SET_SELECTED_ITEM, CLEAR_SELECTED_ITEM } from './action_constants'


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


  
    
  
  

  

export default {   setSelectedItem, clearSelectedItem}