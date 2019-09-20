import React,{Fragment} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
      render() {
        
        console.log(this.props.alerts);
           var  namesList= this.props.alerts.map(alert=>
                 <div key={alert.id} className={`alert alert-${alert.alrtype}`}>
                     {alert.msg}
                 </div>
            );
         console.log(namesList);
        return (
            <Fragment>
                {namesList}
            </Fragment>
        );
      }
}
const mapStateToProps =(state ,props )=>{
    console.log(state)
    return{alerts : state.alert
    }
    
  }

export default connect(mapStateToProps)(Alert) ;