import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";

class Recharge extends Component {
  static propTypes = {
    recharge: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const {rechargeproductsDispatch} = this.props;
    rechargeproductsDispatch.bind(this)();
  }

  render() {
    return null;
  }
}

const RechargeComponent = connect(function mapStateToProps(state) {
  return {
    recharge: state.recharge
  }
}, function mapDispatchToProps(dispatch) {
  return {
    rechargeproductsDispatch() {
      dispatch({
        type: 'recharge/rechargeproducts',
        payload: {}
      });
    }
  }
})(Recharge);

export default RechargeComponent;
