import {Component} from 'react';
import {connect} from 'dva';
import styles from '../../stylesheets';
import menuImg from '../../assets/menu.png';
import qs from 'qs';
import { ActionSheet, Modal, Slider, WingBlank } from 'antd-mobile';

/**
 * 将阅读模式样式数组转化为对象,分别对应属性白天(day)和属性夜晚(night)
 * @param arr
 * @param key
 * @returns {*}
 */
const keyBy = (arr, key) => {
  if (!Array.isArray(arr)) {
    return arr;
  }
  let result = {};
  arr.length > 0 && arr.forEach((val, index) => {
    result[val[key]] = val;
  });
  return result;
};

/**
 * 阅读模式样式分为白天和夜间模式
 * @type {*[]}
 */
const readModes = [{
  mode: 'day',
  bgColor: '#fbf9fe',
  fontColor: '#2c2c2c'
}, {
  mode: 'night',
  bgColor: '#0e1031',
  fontColor: 'rgb(70,70,70)'
}];

/**
 * 获取白天或者夜晚模式的背景颜色
 * @param readMode
 * @returns {string|string}
 */
const readMode2BgColor = readMode => {
  //{day: {mode: 'day', bgColor: '#fbf9fe', fontColor: '#2c2c2c'}, night: {mode: 'night', bgColor: '#0e1031', fontColor: 'rgb(70,70,70)'}}
  const modeMap = keyBy(readModes, 'mode');
  return modeMap[readMode].bgColor || '#fbf9fe';
};

/**
 * 获取白天或者夜晚模式的文字颜色
 * @param readMode
 * @returns {string}
 */
const readMode2FontColor = readMode => {
  //{day: {mode: 'day', bgColor: '#fbf9fe', fontColor: '#2c2c2c'}, night: {mode: 'night', bgColor: '#0e1031', fontColor: 'rgb(70,70,70)'}}
  const modeMap = keyBy(readModes, 'mode');
  return modeMap[readMode].fontColor || '#2c2c2c';
};

const mapStateToProps = state => {
  return {
    read: state.read
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset() {
      dispatch({
        type: 'read/reset'
      });
    },
    fetchContent(ficId, serial) {
      dispatch({
        type: 'read/fetchContent',
        payload: {
          fic_id: ficId,
          serial
        }
      });
    },
    handleFontModalVisible: flag => {
      dispatch({
        type: 'read/save',
        payload: {
          fontModalVisible: !!flag
        }
      });
    },
    handleReadModaModalVisible: flag => {
      dispatch({
        type: 'read/save',
        payload: {
          readModeModalVisible: !!flag
        }
      });
    },
    setFontSize: size => {
      const fontSize = parseInt(size, 10) + 10;
      localStorage.setItem('fontSize', size);
      dispatch({
        type: 'read/save',
        payload: {
          fontSize: `${fontSize}px`
        }
      });
    },
    setReadMode: readMode => {
      localStorage.setItem('readMode', readMode);
      dispatch({
        type: 'read/save',
        payload: {
          readMode
        }
      });
    }
  };
};
// 处理滚动事件穿透ISSUE
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

/**
 * @param {number} serial - query string,小说章节数
 * @param {number} ficId - query string,小说ID
 */
@connect(mapStateToProps, mapDispatchToProps)
class Read extends Component {
  state = {
    redirect: false,
    ficId: null,
    serial: null
  };

  nextChapter = () => {
    const { read: {ficId, serial}} = this.props;
    window.location.href = `/read?ficId=${ficId}&serial=${serial + 1}`;
  };

  lastChapter = () => {
    const { read: {ficId, serial}} = this.props;
    if (1 === serial) {
      return;
    }
    window.location.href = `/read?ficId=${ficId}&serial=${serial - 1}`;
  };

  componentWillUnmount() {
    const {reset} = this.props;
    reset();
  }

  componentDidMount() {
    // 加载小说
    const {location} = this.props;
    const params = qs.parse(location.search.substr(1));
    this.props.fetchContent(params.ficId, params.serial);
    // 从localStorage加载阅读设置
    const fontSize = localStorage.getItem('fontSize');
    const readMode = localStorage.getItem('readMode');
    this.props.setReadMode(readMode || 'day');
    this.props.setFontSize(fontSize || 18);
  }

  onCtrlClick = btnIndex => {
    const {handleReadModaModalVisible, handleFontModalVisible, history, location} = this.props;
    if (0 === btnIndex) {
      handleFontModalVisible(true);
    } else if (1 === btnIndex) {
      handleReadModaModalVisible(true);
    } else if (2 === btnIndex) {
      const { read: {ficId, ficTitle}} = this.props;
      history.push(`/chapter?ficId=${ficId}&title=${ficTitle}`);
    } else if (3 === btnIndex) {
      history.push('/');
    }
  };

  onChargeClick = () => {
    const { history } = this.props;
    history.push('/recharge');
  };

  onWrapTouchStart = e => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };

  showActionSheet = () => {
    const buttons = ['字体大小', '背景颜色', '返回目录', '返回首页', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: buttons,
        cancelButtonIndex: buttons.length - 1,
        maskClosable: true,
        'data-seed': 'logId',
        wrapProps,
      },
      buttonIndex => {
        this.onCtrlClick(buttonIndex);
      });
  };

  render() {
    const { read: {chapTitle, ficTitle, avatar, serial, content, fontSize, readMode, fontModalVisible,
      readModeModalVisible, needToChargeVisible, costBalance, userBalance},
      handleReadModaModalVisible, handleFontModalVisible, setFontSize, setReadMode} = this.props;
    return (<main className={styles['read']['main']} style={{backgroundColor: `${readMode2BgColor(readMode)}`}}>
      <section style={{color: `${readMode2FontColor(readMode)}`}} className={styles['read']['head-title']}>{chapTitle}</section>
      <section className={styles['read']['sub-title']}>
        <img alt='loading' src={avatar} className={styles['read']['sub-title-avatar']}/>
        <span>{ficTitle}</span>
      </section>
      <article className={styles['read']['main-content']} style={{fontSize: fontSize, color: `${readMode2FontColor(readMode)}`}} onClick={this.showActionSheet}>
        {
          content
        }
      </article>
      <section className={styles['read']['footer']}>
        {
          needToChargeVisible ? (
            <div className={styles['read']['footer-charge']}>
              <div className={styles['read']['footer-charge-btn']} onClick={this.onChargeClick}>充值</div>
              <p className={styles['read']['footer-charge-balance_info']}>本章价格 {costBalance} 书币</p>
              <p className={styles['read']['footer-charge-balance_info']}>当前余额 {userBalance} 书币</p>
            </div>
          ) : (
            <div className={styles['read']['footer-normal']}>
              <div
                style={{visibility: `${serial === 1 ? 'hidden': 'visible'}`, color: `${readMode2FontColor(readMode)}`}}
                className={styles['read']['footer-normal-text-btn']}
                onClick={this.lastChapter.bind(null)}
              >
                上一章
              </div>
              <div className={styles['read']['footer-normal-icon-btn']} onClick={this.showActionSheet}>
                <img alt="loading" src={menuImg} className={styles['read']['footer-normal-icon-btn-icon']}/>
              </div>
              <div 
                style={{color: `${readMode2FontColor(readMode)}`}}
                className={styles['read']['footer-normal-text-btn']}
                onClick={this.nextChapter.bind(null)}
              >
                下一章
              </div>
            </div>
          )
        }
      </section>
      <Modal
          visible={fontModalVisible}
          transparent
          maskClosable={false}
          onClose={handleFontModalVisible.bind(null, false)}
          title="字体大小"
          footer={[{
            text: '确定', onPress: () => {
              handleFontModalVisible(false);
            }
          }]}
          wrapProps={{onTouchStart: this.onWrapTouchStart}}
        >
          <div className={styles['read']['font']}>
            <span style={{fontSize: '14px'}}>A</span>
            <WingBlank className={styles['read']['font-slider']}>
              <Slider
                defaultValue={8}
                min={0}
                max={20}
                onAfterChange={setFontSize}
              />
            </WingBlank>
            <span style={{fontSize: '25px'}}>A</span>
          </div>
        </Modal>
        <Modal
          visible={readModeModalVisible}
          transparent
          title="背景颜色"
          maskClosable={false}
          onClose={handleReadModaModalVisible.bind(null, false)}
          footer={[{
            text: '确定', onPress: () => {
              handleReadModaModalVisible(false);
            }
          }]}
          wrapProps={{onTouchStart: this.onWrapTouchStart}}
        >
          <div className={styles['read']['read-mode']}>
            {
              readModes.map(val => {
                return <div
                  onClick={setReadMode.bind(null, val.mode)}
                  key={val.mode}
                  style={{backgroundColor: `${val.bgColor}`}}
                  className={`${styles['read']['read-mode-option']} ${val.mode === readMode ? `${styles['read']['selected']}` : ''}`}
                />
              })
            }
          </div>
        </Modal>
      </main>);
  }
}

export default Read;
