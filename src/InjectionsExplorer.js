import React, {Component} from 'react';
import InjectedBindingRow from './InjectedBindingRow';

class InjectionsExplorer extends Component {

    constructor(props) {
        super(props);
       
    
    }

 
    getConstructorArgumentPosition(targetName,className) {

        let position = "-1";
        if (targetName && className){
            let prefix = className + ".constructor[";
            if (targetName.indexOf(prefix) !== -1){
                position = targetName.substring( ( 0 + prefix.length), targetName.length-1 );
                let integerValue = parseInt(position);
                integerValue++; // the argument indices are zero based. Make them non zero based
                position = "" + integerValue;
            }
        }

        return position;
    }


    getConstructorName() {
        let constructorName="";
        
        if (this.props.selectedItem.details){
            
            if (this.props.selectedItem.details.valueConstructor)
              constructorName = this.props.selectedItem.details.valueConstructor;
            else if (this.props.selectedItem.details.providerConstructor)
              constructorName = this.props.selectedItem.details.providerConstructor;

        }

        return constructorName;
    }

    getEmptyConstructorInjectionsSection(theClassName) {

        return (
           <div>
         
           <table className="table table-bordered">
                    <thead className="thead-light">
                             <tr>
                                 <th>Class</th>
                                 
                             </tr>
                     </thead>
                        <tbody>
                         <tr>
             <td>{theClassName}</td>
                            
                         </tr>
                         </tbody>
         </table>                
                    <br/>      
             <p>The class <b>'{theClassName}'</b> has no injections.</p>
          
    </div>
        );
   
       }  
   
    getConstructorInjectionsSection(theClassName, contructorInjectionRows) {

     return (
        <div>
      
        <table className="table table-bordered">
                 <thead className="thead-light">
                          <tr>
                              <th>Class</th>
                              
                          </tr>
                  </thead>
                     <tbody>
                      <tr>
          <td>{theClassName}</td>
                         
                      </tr>
                      </tbody>
      </table>                
                 <br/>      
          <p>The class <b>'{theClassName}'</b> makes use of several injections.</p>
          <p>They are listed below :</p>
  
          <h1>Constructor Injections</h1>
          
          <table className="table table-bordered">
                 <thead className="thead-light">
                          <tr>
                              <th>Location</th>
                              <th>Binding Key</th>
                              <th>Optional</th>
                          </tr>
                  </thead>
                     <tbody>
                         {contructorInjectionRows}
                      </tbody>
      </table>                
  
  
              </div>
     );

    }  

    render() {
        
        let className = this.getConstructorName();


        let constructorInjectionsList =null;
/*
{"constructorArguments":[{"targetName":"Bootstrapper.constructor[0]","bindingKey":"application.instance"},{"targetName":"Bootstrapper.constructor[1]","bindingKey":"boot.project_root"},{"targetName":"Bootstrapper.constructor[2]","bindingKey":"boot.options","optional":true}]}
*/
        // check if injections.constructorArguments array exists  
        if (this.props.selectedItem.details.injections && this.props.selectedItem.details.injections.constructorArguments){

            const argInjections = this.props.selectedItem.details.injections.constructorArguments;
            let context_this=this;
            let childIndex=1;
            constructorInjectionsList = argInjections.map( function(injection){
                let optional ="No";
                if (injection.optional === true){
                    optional = "Yes";
                }

                let position = context_this.getConstructorArgumentPosition(injection.targetName,className);

                let bindingKey = injection.bindingKey;

/*

               "bindingKey": "",
                "decorator": "@config",
*/                
                if (bindingKey === ""){
                    if (injection.decorator){
                        // DOM TODO : resolve this config
                        bindingKey = injection.decorator;
                        if (bindingKey === "@config"){
                            //cheat a bit here for now 
                            bindingKey = context_this.props.bindingName + ":$config";
                        }
                    }
                }
                
                return  <InjectedBindingRow key={childIndex++} constructorArgPosition={position} injectedBindingName={bindingKey} isOptional={optional}/>
            });
            
    
        }//if

   

        return (
            <div>
      
      <table className="table table-bordered">
               <thead className="thead-light">
                        <tr>
                            <th>Class</th>
                            
                        </tr>
                </thead>
                   <tbody>
                    <tr>
        <td>{className}</td>
                       
                    </tr>
                    </tbody>
    </table>                
               <br/>      
        <p>This class <b>'{className}'</b> makes use of several injections.</p>
        <p>They are listed below :</p>

        <h1>Constructor Injections</h1>
        
        <table className="table table-bordered">
               <thead className="thead-light">
                        <tr>
                            <th>Location</th>
                            <th>Binding Key</th>
                            <th>Optional</th>
                        </tr>
                </thead>
                   <tbody>
                       {constructorInjectionsList}
                    </tbody>
    </table>                


            </div>
        );
    }

    
}

export default InjectionsExplorer;

