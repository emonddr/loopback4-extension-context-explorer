import React, {Component} from 'react';
import Context from './Context';


class BindingExplorer extends Component {
  
    getUniqueID() {
        return "" + Math.random();
    }

    thereAreContextBindings() {

     let value = false;

     if (this.props.applicationBindingData && this.props.applicationBindingData.bindings &&
         this.props.serverBindingData && this.props.serverBindingData.bindings &&
         this.props.requestBindingData && this.props.requestBindingData.bindings 
      ) {
         value = true;  
      }

      return value;
    }

    render() {
      
              if ( !this.thereAreContextBindings() ) {
                // nothing to render, yet...    
                return <div>Loading...</div>;
              } 
              else {
                // something to render
             const appBindingsAsString = JSON.stringify(this.props.applicationBindingData.bindings);
             const restServerBindingsAsString = JSON.stringify(this.props.serverBindingData.bindings);
             const requestBindingsAsString = JSON.stringify(this.props.requestBindingData.bindings);
      return (

<div id="tree" data-type="tree" data-guid="777"
    className="gj-unselectable gj-tree-bootstrap-4 bindingExplorer overflow-auto">
    <ul className="gj-list gj-list-bootstrap floatLeft">
     <Context key="1" theIndex="1" name={this.props.requestBindingData.name} contextType={this.props.requestBindingData.type} bindings={requestBindingsAsString} selectedBindingCallback={this.props.selectedBindingCallback} selectedItem={this.props.selectedItem} clearSelectedBindingCallback={this.props.clearSelectedBindingCallback}/>      
     <Context key="2" theIndex="2" name={this.props.serverBindingData.name} contextType={this.props.serverBindingData.type} bindings={restServerBindingsAsString} selectedBindingCallback={this.props.selectedBindingCallback} selectedItem={this.props.selectedItem} clearSelectedBindingCallback={this.props.clearSelectedBindingCallback}/>     
     <Context key="3" theIndex="3" name={this.props.applicationBindingData.name} contextType={this.props.applicationBindingData.type} bindings={appBindingsAsString} selectedBindingCallback={this.props.selectedBindingCallback} selectedItem={this.props.selectedItem} clearSelectedBindingCallback={this.props.clearSelectedBindingCallback}/>
     
     
    </ul>
</div>
            
      );
      }
     
    }


}


export default BindingExplorer;