import React, { Component } from "react";
 
class Contact extends Component {
  render() {
    return (
      <div>
        <div style={{marginBottom: '15px', fontWeight: 'bold'}}>{this.props.sideBarDetails.heading}</div>
        {this.props.sideBarDetails.data}
      </div>
    );
  }
}
 
export default Contact;