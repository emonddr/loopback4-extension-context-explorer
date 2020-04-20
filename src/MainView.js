import React, {Component} from 'react';
import { connect } from 'react-redux'
import { setSelectedItem }    from './actions/action_creator';
import { clearSelectedItem } from './actions/action_creator';
import BindingExplorer from './BindingExplorer';
import BindingInfo from './BindingInfo';
import { fetchInspectionData } from './actions/action_creator';     

class MainView extends Component {
    constructor(props) {
        super(props);

        this.updateSelectedBinding = this.updateSelectedBinding.bind(this); 
        this.clearSelectedBinding = this.clearSelectedBinding.bind(this); 
        this.retrieveInspectionData = this.retrieveInspectionData.bind(this);
        this.retrieveInspectionData();
    }


    render() {

 
        return (
            <div className="row">  
           
                <div className="col" >
                  <div className="card bg-light mb-3" >
                    <div className="card-body">
                        <h2 className="card-title">Context Bindings</h2>
                    </div>    
                  </div>
                  <BindingExplorer selectedItem={this.props.selectedItem} selectedBindingCallback={this.updateSelectedBinding} clearSelectedBindingCallback={this.clearSelectedBinding}  requestBindingData={this.props.requestBindingData} serverBindingData={this.props.serverBindingData} applicationBindingData={this.props.applicationBindingData} fetchDataCallBack={this.retrieveInspectionData}/>  
                </div>
                <div className="col" >
                  <div className="card bg-light mb-3" >
                    <div className="card-body">
                        <h2 className="card-title">Binding Information</h2>
                    </div>    
                  </div>

                  <BindingInfo selectedItem={this.props.selectedItem}/>
                </div>     
          
          </div>
  
        );
    }

    clearSelectedBinding( ) {
      this.props.d2p_clearSelectedItem();
    }

    updateSelectedBinding( selectedItem) {
        this.props.d2p_setSelectedItem( selectedItem["name"], selectedItem["context_name"], selectedItem["details"], selectedItem["context_type"] );
      }

      retrieveInspectionData( ) {
        this.props.d2p_fetchInspectionData();
      }
  
}


  const mapDispatchToProps = (dispatch) => {
  
  
    return {
  
      d2p_clearSelectedItem : () => {
       
       dispatch( clearSelectedItem()  );
      },
  
      d2p_setSelectedItem : (some_name,some_context_name, some_details, some_type) => {
       
       dispatch( setSelectedItem(some_name,some_context_name, some_details,some_type)  );
      } ,
      
 
      d2p_fetchInspectionData : () => {
       
        dispatch( fetchInspectionData()  );
       },
           
  
    }
  };
  

  function mapStateToProps(reduxState) {
   
   return {
     selectedItem              : reduxState.selectedItem,
     requestBindingData        : reduxState.requestBindingData,
     serverBindingData         : reduxState.serverBindingData,     
     applicationBindingData    : reduxState.applicationBindingData   
   }
  
  }
  
  
export default connect(mapStateToProps,mapDispatchToProps)(MainView);
  