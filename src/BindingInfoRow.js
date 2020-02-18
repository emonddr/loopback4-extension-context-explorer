import React, {Component} from 'react';


class BindingInfoRow extends Component {
  constructor(props) {
    super(props);
}

 
    render() {

        let value = this.props.value;

        if ( Array.isArray(this.props.value)){// e.g. 'tags'
          let concatenatedValue = "";
          for(let i=0;i< this.props.value.length;i++){
            concatenatedValue = concatenatedValue + this.props.value[i];
            if (i < (this.props.value.length-1)){
              concatenatedValue = concatenatedValue + "  ,  " ;
            }
          }//for 

          value = concatenatedValue;
        }//if

        
        return (
          <tr>
          <td >{this.props.name}</td><td className="textWrap" >{value}</td> 
         </tr>
        );
    }
}

export default BindingInfoRow;