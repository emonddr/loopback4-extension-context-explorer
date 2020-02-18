import React, {Component} from 'react';
import Binding from './Binding';

class Context extends Component {
    constructor(props) {
        super(props);
        this.state = {
     
          contextExpanded:false,
          inFocus:false
        };

     // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this); 

    }

    getDataMode() {

        if (this.state.contextExpanded)
           return "open";
        else 
           return "close";

    }

    getIconClassName() {

        if (this.state.contextExpanded)
           return "gj-icon minus";
        else 
           return "gj-icon plus";

    }

    getBlockClassName() {
        if (this.state.contextExpanded)
         return "gj-list gj-list-bootstrap showBlock";
        else 
         return "gj-list gj-list-bootstrap hideBlock";

    }

    getClassName() {

        if (this.state.inFocus)
           return "list-group-item active";
        else 
           return "list-group-item";

    }
    getUniqueID() {
        return "" + Math.random();
    }

    getEmptyBindingList() {
       return (
        <Binding key={this.getUniqueID()} contextType={this.props.contextType} bindingName="[ No bindings ]" bindingDetails="" contextName={this.props.name} selectedBindingCallback={this.props.selectedBindingCallback} selectedItem={this.props.selectedItem}/>       
       );
    }

    render() {

        
        let bindingsList =null;

        // check if a context has any bindings or not 
        if (this.props.bindings){

            const bindingsObject = JSON.parse(this.props.bindings);
            let keys = Object.getOwnPropertyNames(bindingsObject);

            if (keys.length > 0){
               // there are bindings
               keys = keys.sort();                
               const context_this = this;
               let childIndex=1;
               bindingsList = keys.map(function(bindingName){
                   const bindingDetails = bindingsObject[bindingName];
                   return <Binding key={context_this.getUniqueID()} theIndex={childIndex++} contextName={context_this.props.name} contextType={context_this.props.contextType} bindingName={bindingName} bindingDetails={bindingDetails} selectedBindingCallback={context_this.props.selectedBindingCallback} selectedItem={context_this.props.selectedItem}/>;
                 })
   
            }//if
            
    
        }//if

        if (!bindingsList) {
          bindingsList = this.getEmptyBindingList();
        }//if


        return (
            <li data-id={this.props.theIndex} data-role="node" className={this.getClassName()} data-selected="true" onClick={ this.handleClick}>

            <div data-role="wrapper">
              <span data-role="spacer" ></span>
              <span data-role="expander"
                            data-mode={this.getDataMode()} className="gj-tree-material-icons-expander"><i className={this.getIconClassName()}></i></span>
    <span className="floatLeft" data-role="display" data-toggle="tooltip" title={this.props.name}>{this.props.contextType}</span>
            </div>
            
            <ul className={this.getBlockClassName()} >
                {bindingsList}
            </ul>           

            </li>            
        );
    }

    

    handleClick(e) {

        e.stopPropagation();

        this.setState({
            contextExpanded: !this.state.contextExpanded
             
        });

        this.props.clearSelectedBindingCallback();
    }
    
}


export default Context;