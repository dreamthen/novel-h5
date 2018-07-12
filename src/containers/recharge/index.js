import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";
import code from "../../static/code";
import styles from "../../stylesheets";

@connect(function mapStateToProps(state) {
  return {
    recharge: state.recharge,
    personal: state.personal
  }
}, function mapDispatchToProps(dispatch) {
  return {
    reset() {
      dispatch({
        type: 'recharge/reset'
      });
    },
    /**
     * 搜索充值产品列表
     */
    rechargeproductsDispatch() {
      dispatch({
        type: 'recharge/rechargeproducts',
        payload: {}
      });
    },
    /**
     * 改变充值产品类型
     * @param rechargeSelect
     * @param charge_type_id
     */
    rechargeSelectChange({rechargeSelect, charge_type_id}) {
      dispatch({
        type: 'recharge/rechargeSelectChange',
        payload: {rechargeSelect, charge_type_id}
      });
    },
    /**
     * 充值
     * @param charge_type_id
     * @param signType
     */
    payorders(charge_type_id, signType) {
      dispatch({
        type: 'recharge/payorders',
        payload: {
          charge_type_id,
          signType
        }
      })
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

  componentWillUnmount() {
    const {reset} = this.props;
    reset.bind(this)();
  }

  /**
   * 改变充值产品类型
   * @param rechargeSelect
   * @param id
   * @param e
   */
  changeRechargeSelect(rechargeSelect, id, e) {
    const {rechargeSelectChange} = this.props;
    rechargeSelectChange.bind(this)({rechargeSelect, charge_type_id: id});
    //取消冒泡事件
    e.nativeEvent.stopImmediatePropagation();
  }

  /**
   * 确认充值
   * @param e
   */
  payordersHandler(e) {
    const {payorders, recharge} = this.props;
    const {charge_type_id, signType} = recharge;
    payorders.bind(this)(charge_type_id, signType);
    //取消冒泡事件
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const {changeRechargeSelect, payordersHandler} = this;
    const {recharge, personal} = this.props;
    const {rechargeproductsList, rechargeSelect} = recharge;
    const {balance} = personal;
    return (
      <section className={styles["recharge"]["recharge"]}>
        <header className={styles["recharge"]["recharge-header"]}>
          <h2 className={styles["recharge"]["recharge-header-title"]}>充值</h2>
        </header>
        <main className={styles["recharge"]["recharge-main"]}>
          <section className={styles["recharge"]["recharge-main-balance"]}>
            您的余额: <span className={styles["recharge"]["recharge-main-balance-price"]}>{balance}</span> 书币
          </section>
          <section className={styles["recharge"]["recharge-main-description"]}>
            选择充值金额 <span className={styles["recharge"]["recharge-main-description-change"]}>(1元=100书币)</span>
          </section>
          <section className={styles["recharge"]["recharge-main-container"]}>
            {
              rechargeproductsList.map((rechargeproductItem, rechargeproductIndex) => {
                return (
                  <section key={rechargeproductIndex}
                           className={rechargeSelect === rechargeproductIndex ? `${styles["recharge"]["recharge-main-container-categories"]} ${styles["recharge"]["recharge-main-container-categories-select"]}` : styles["recharge"]["recharge-main-container-categories"]}
                           onClick={changeRechargeSelect.bind(this, rechargeproductIndex, rechargeproductItem["id"])}
                  >
                    <h4
                      className={styles["recharge"]["recharge-main-container-categories-price"]}>
                      {rechargeproductItem["price"]}元
                    </h4>
                    {
                      !code["recharge_static"]["empty_balance"].includes(rechargeproductItem["balance"]) ?
                        <aside className={styles["recharge"]["recharge-main-container-categories-aside"]}>
                          <p
                            className={styles["recharge"]["recharge-main-container-categories-aside-balance"]}>
                            {rechargeproductItem["balance"]}书币
                          </p>
                          {
                            rechargeproductItem["bonus_price"] !== undefined &&
                            <dfn className={styles["recharge"]["recharge-main-container-categories-aside-bonusPrice"]}>
                              多送{rechargeproductItem["bonus_price"]}元
                            </dfn>
                          }
                          {
                            rechargeproductItem["remark"] &&
                            <dfn className={styles["recharge"]["recharge-main-container-categories-aside-description"]}>
                              {rechargeproductItem["remark"]}
                            </dfn>
                          }
                        </aside> :
                        <dfn className={styles["recharge"]["recharge-main-container-categories-description"]}>
                          {rechargeproductItem["remark"]}
                        </dfn>
                    }
                  </section>
                )
              })
            }
          </section>
        </main>
        <footer className={styles["recharge"]["recharge-footer"]}>
          <button className={styles["recharge"]["recharge-footer-forSurePrice"]}
                  onClick={payordersHandler.bind(this)}
          >
            确认充值
          </button>
          <p className={styles["recharge"]["recharge-footer-attention"]}>
            <span className={styles["recharge"]["recharge-footer-attention-symbol"]}>*</span>
            1元=100书币, 书币属于虚拟商品, 一经购买不得退换
          </p>
          <p className={styles["recharge"]["recharge-footer-attention"]}>
            <span className={styles["recharge"]["recharge-footer-attention-symbol"]}>*</span>
            充值后书币到帐可能有延迟, 1小时内未到帐请与客服联系。 客服微信: L9_99999999
          </p>
          <p className={styles["recharge"]["recharge-footer-attention"]}>
            <span className={styles["recharge"]["recharge-footer-attention-symbol"]}>*</span>
            工作时间: 周一到周六 8:30-12:00, 13:30-23:00
          </p>
        </footer>
      </section>
    )
  }
}

export default RechargeComponent;
