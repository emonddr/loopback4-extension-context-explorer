import React, {Component} from 'react';
import Context from './Context';


class BindingExplorer extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          requestBindingInfo:null,
          appBindingInfo: null,
          restServerBindingInfo : null,
        };

    
      }


      componentDidMount() {
        fetch("http://localhost:3000/inspect")
          .then(res => res.json())
          .then(
            (result) => {
              let data = result;
             let requestBindingData = { name: data.name,bindings: data.bindings, type:"Request Context"};
             let serverBindingData  = { name: data.parent.name,bindings: data.parent.bindings, type:"Server Context"};
             let appBindingData     = { name: data.parent.parent.name,bindings: data.parent.parent.bindings, type:"Application Context"};
             
              //console.log(result);
              this.setState({
                isLoaded: true,
                requestBindingInfo:  requestBindingData,
                restServerBindingInfo : serverBindingData,      
                appBindingInfo: appBindingData                
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('There was an error');
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

   
    getUniqueID() {
        return "" + Math.random();
    }
    render() {
      

               const { error, isLoaded, appBindingInfo,restServerBindingInfo ,requestBindingInfo} = this.state;
              if (error) {
                  console.log('There was an error in render');
                return <div>Error: {error.message}</div>;
              } else if (!isLoaded) {
                  console.log('Still loading in render');
                return <div>Loading...</div>;
              } else {

             const appBindingsAsString = JSON.stringify(appBindingInfo.bindings);
             const restServerBindingsAsString = JSON.stringify(restServerBindingInfo.bindings);
             const requestBindingsAsString = JSON.stringify(requestBindingInfo.bindings);
      return (

<div id="tree" data-type="tree" data-guid="777"
    className="gj-unselectable gj-tree-bootstrap-4 bindingExplorer overflow-auto">
    <ul className="gj-list gj-list-bootstrap floatLeft">
     <Context key="1" theIndex="1" name={requestBindingInfo.name} contextType={requestBindingInfo.type} bindings={requestBindingsAsString} selectedBindingCallback={this.props.selectedBindingCallback} selectedItem={this.props.selectedItem} clearSelectedBindingCallback={this.props.clearSelectedBindingCallback}/>      
     <Context key="2" theIndex="2" name={restServerBindingInfo.name} contextType={restServerBindingInfo.type} bindings={restServerBindingsAsString} selectedBindingCallback={this.props.selectedBindingCallback} selectedItem={this.props.selectedItem} clearSelectedBindingCallback={this.props.clearSelectedBindingCallback}/>     
     <Context key="3" theIndex="3" name={appBindingInfo.name} contextType={appBindingInfo.type} bindings={appBindingsAsString} selectedBindingCallback={this.props.selectedBindingCallback} selectedItem={this.props.selectedItem} clearSelectedBindingCallback={this.props.clearSelectedBindingCallback}/>
     
     
    </ul>
</div>
            
      );
      }
     
    }


}


export default BindingExplorer;