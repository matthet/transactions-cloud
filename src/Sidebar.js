import React, { Component } from "react";
 
class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="subheading">{this.props.sideBarDetails.heading}</div>
        {this.props.sideBarDetails.data}
      </div>
    );
  }
}
 
export default Sidebar;