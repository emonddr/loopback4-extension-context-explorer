import React, {Component} from 'react';


class InjectedBindingRow extends Component {
  constructor(props) {
    super(props);
}

 
    render() {

   
        
        return (
          <tr>
          <td>Constructor Argument {this.props.constructorArgPosition}</td><td>{this.props.injectedBindingName}</td><td>{this.props.isOptional}</td> 
         </tr>
        );
    }
}

export default InjectedBindingRow;