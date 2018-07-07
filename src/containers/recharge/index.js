import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";
import styles from "../../stylesheets";

@connect(function mapStateToProps(state) {
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
})

class RechargeComponent extends Component {
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
    const {recharge} = this.props;
    const {rechargeproductsList} = recharge;
    return (
      <section className={styles["recharge"]["recharge"]}>
        <header className={styles["recharge"]["recharge-header"]}>
          <h2 className={styles["recharge"]["recharge-header-title"]}>充值</h2>
        </header>
      </section>
    )
  }
}

export default RechargeComponent;
