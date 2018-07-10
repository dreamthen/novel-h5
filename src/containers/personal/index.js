import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";

@connect(function mapStateToProps(state) {
  return {
    personal: state.personal
  }
}, function mapDispatchToProps(dispatch) {
  return {

  }
})

class PersonalComponent extends Component {
  static propTypes = {
    personal: PropTypes.object
  };

  render() {
    return null;
  }
}

export default PersonalComponent;

