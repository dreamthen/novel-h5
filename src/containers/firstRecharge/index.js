import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";
import assets from "../../assets";
import styles from "../../stylesheets";


@connect(function mapStateToProps(state) {
  return {
    firstRecharge: state.firstRecharge
  }
}, function mapDispatchToProps(dispatch) {
  return {
    /**
     * 发起首充动作
     * @param payload
     */
    firstRechargeEvent(payload) {
      dispatch({
        type: 'firstRecharge/firstRechargeRequest',
        payload
      });
    }
  }
})

class FirstRechargeComponent extends Component {
  static propTypes = {
    firstRecharge: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  /**
   * 发起首充
   * @param e
   */
  firstRechargeHandler(e) {
    const {firstRecharge, firstRechargeEvent} = this.props;
    const {appid} = firstRecharge;
    firstRechargeEvent.bind(this)({appid, signType: "MD5"});
    //取消冒泡事件
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const {firstRechargeHandler} = this;
    return (
      <section className={styles["firstRecharge"]["firstRecharge"]}>
        <img src={assets["rechargeBanner"]} className={styles["firstRecharge"]["firstRecharge-banner"]}/>
        <img src={assets["rechargeDescribe"]} className={styles["firstRecharge"]["firstRecharge-describe"]}/>
        <button className={styles["firstRecharge"]["firstRecharge-recharge"]}
                onClick={firstRechargeHandler.bind(this)}
        >
          立即充值
        </button>
      </section>
    )
  }
}

export default FirstRechargeComponent;

