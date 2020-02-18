import React, {Component} from 'react';

class Binding extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this); 
    
    }

    getUniqueID() {
        return "" + Math.random();
    }

     currentlySelected() {
        let selected = false;

        if (this.props.selectedItem && this.props.selectedItem.name){
            selected = this.props.bindingName === this.props.selectedItem.name;
        }
        return selected;
     }

    handleClick(e) {
     
     e.stopPropagation();

      
        const item_details = { "name" : this.props.bindingName,"context_name":this.props.contextName, "details": this.props.bindingDetails, "context_type": this.props.contextType}; 
        this.props.selectedBindingCallback(item_details);  
     
    }
    
    getClassName() {

        if (this.currentlySelected())
           return "simulatedLink floatLeft activeLink";
        else 
           return "simulatedLink floatLeft";

    }

    render() {
        
        return (
            <li data-id={this.props.theIndex} data-role="node" className="list-group-item">
              <div data-role="wrapper">
              <span data-role="spacer" className="childSpacer"></span>
              <span className={this.getClassName()} data-role="display" onClick={ this.handleClick}>{this.props.bindingName}</span>
              </div>
            </li>
        );
    }

    
}

export default Binding;

