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
        <main className={styles["recharge"]["recharge-main"]}>
          <section className={styles["recharge"]["recharge-main-balance"]}>
            您的余额: <span className={styles["recharge"]["recharge-main-balance-price"]}>200</span> 书币
          </section>
          <section className={styles["recharge"]["recharge-main-description"]}>
            选择充值金额 <span className={styles["recharge"]["recharge-main-description-change"]}>(1元=100书币)</span>
          </section>
          {
            rechargeproductsList.map((rechargeproductItem, rechargeproductIndex) => {
              return (
                <section key={rechargeproductIndex} className={styles["recharge"]["recharge-main-categories"]}>
                  <h4>{rechargeproductItem["price"]}元</h4>
                </section>
              )
            })
          }
        </main>
      </section>
    )
  }
}

export default RechargeComponent;
