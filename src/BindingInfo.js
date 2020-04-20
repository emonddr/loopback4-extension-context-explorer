import React, {Component} from 'react';
import BindingInfoRow from './BindingInfoRow';
import InjectionsExplorer from './InjectionsExplorer';

class BindingInfo extends Component {
    constructor(props) {
        super(props);
        this.detailsTabRef = React.createRef();
    }  


    getInjectionsCount() {
      let count=0;

      if (this.props.selectedItem.details.injections && this.props.selectedItem.details.injections.constructorArguments) {
         count = this.props.selectedItem.details.injections.constructorArguments.length;
      }

      return count;
    }

    isObject(something) {
        return (typeof something === "object" && !Array.isArray(something) && something !== null);
    }

    isBoolean(someValue) {
      return ((typeof someValue === 'boolean'));
    }
    convertTagsObjectToArray(tagsObject) {
      let tagsArray = [];
      
      if (tagsObject) {

        const keys = Object.getOwnPropertyNames(tagsObject).sort();

        
        const context_this = this;
        tagsArray = keys.map(function(tagName){
            const tagValue = tagsObject[tagName];
            return "" + tagName + " : " + tagValue;
          });

          if (tagsArray.length == 0){
              tagsArray.push("None");
          }

      }

      return tagsArray;
    }

    render2() {
        return (
           
 <div>
<ul className="nav nav-tabs" role="tablist">
  <li className="nav-item">
    <a className="nav-link active" href="#details" role="tab" data-toggle="tab">Details</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#consumers" role="tab" data-toggle="tab">Consumers</a>
  </li>
  
</ul>


<div className="tab-content">
  <div role="tabpanel" className="tab-pane fade in active show" id="details">AAA</div>
  <div role="tabpanel" className="tab-pane fade" id="consumers">BBB</div>
</div>

</div>
               
        );
    }    

    componentDidUpdate() {
    const detailsTab = this.detailsTabRef;
    if (detailsTab && detailsTab.current){
      detailsTab.current.click();
    }

   }

    render() {

         let bindingName="";
         let contextName="";
         let propertyRows ="";
         let contextNameHeader="";
         let hasInjections=false;
         let hasConsumers = false;
         let consumersCount=0;
         let injectionsCount=0;

         if (this.props.selectedItem && this.props.selectedItem.details){
            contextName = this.props.selectedItem.context_name;
            bindingName = this.props.selectedItem.name;
            contextNameHeader = this.props.selectedItem.context_type + " Name";

            const keys = Object.getOwnPropertyNames(this.props.selectedItem.details).sort();

            // capture the 'injections' data for its own tab
            hasInjections =keys.includes("injections");
 
            let childIndex=1;
            const context_this = this;

            // let's filter out the 'injections' property of the binding, so it doesn't appear in the 
            // binding details tab. It will appear in its own tab.
            
            propertyRows = keys.filter(propertyName => propertyName !== "injections").map(function(propertyName){

                
                let propertyValue = context_this.props.selectedItem.details[propertyName];

                //turn a boolean into a string (not sure why react cannot handle it as pure boolean
                if (context_this.isBoolean(propertyValue)){
                    propertyValue = "" + propertyValue;//convert to string
                }

                if (propertyName === "tags") {
                    // for tags, convert it to an array; react doesn't like objects being passed into properties
                    propertyValue = context_this.convertTagsObjectToArray(propertyValue);
                }

                let isObject = "false";

                    if (context_this.isObject(propertyValue)){
                        isObject = "true";
                        propertyValue = JSON.stringify(propertyValue);
                    }//if

           
                return <BindingInfoRow key={childIndex++} name={propertyName} value={propertyValue} isObject={isObject}/>;
              });

              return (

<div>
<ul className="nav nav-tabs" role="tablist">
  <li className="nav-item">
    <a ref={this.detailsTabRef} className="nav-link active" href="#details" role="tab" data-toggle="tab">Details</a>
  </li>


 {
   
   hasInjections &&  (
  <li className="nav-item">
    <a className="nav-link" href="#injections" role="tab" data-toggle="tab">Injections({ this.getInjectionsCount()})</a>
  </li>
   )
}
  
  {
    hasConsumers && (
  <li className="nav-item">
              <a className="nav-link" href="#consumers" role="tab" data-toggle="tab">Consumers({consumersCount})</a>
  </li>
  )
  }
</ul>

<div className="tab-content">
  
  <div role="tabpanel" className="tab-pane fade in active show" id="details">

            <table className="table table-bordered">
               <thead className="thead-light">
                        <tr>
                            <th>Binding Name</th>
                            <th>{contextNameHeader}</th>
                        </tr>
                </thead>
                   <tbody>
                    <tr>
                        <td >{ bindingName }</td><td >{ contextName}</td>
                       
                    </tr>
                    </tbody>
                </table>                
               <br/>
                <table className="table table-bordered">
                <thead className="thead-light">
                        <tr>
                            <th>Property Name</th>
                            <th>Property Value</th>
                        </tr>
                </thead>     
                <tbody>
                    {propertyRows}
                    </tbody>
                </table>


  </div>


  
{
  hasInjections && (

  <div role="tabpanel" className="tab-pane fade" id="injections">
      <InjectionsExplorer selectedItem={this.props.selectedItem} bindingName={bindingName}/>
 </div>
  )
     
}

{
  hasConsumers && 
  (
  <div role="tabpanel" className="tab-pane fade" id="consumers">
   <p>Classes that inject this binding: '{ bindingName }'</p>
</div>
  ) 
}


</div>

</div>
    
  );
}//if
else {
    return (
        <div >
            <p>Select a binding on left to view details...</p>
        </div>    
    );
}//endif




    }
}

export default BindingInfo;

