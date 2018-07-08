import {connect} from 'dva';
import {Component} from 'react';
import {Result} from 'antd-mobile';
import styles from '../../stylesheets';

// const resultMap = {
//   last_chapter: {
//     img:
//   }
// };

const myImg = src => <img src={src} className={styles['result']['spe']} alt="" />;

const mapResultToImg = result => {
  // return resultMap[result];
}

@connect()
class ResultPage extends Component {

  render() {
    const { location } = this.props;
    return (<main className={styles['result']['main']}>
      <Result
        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
        title="已是最后一章"
      />
      <div className={styles['result']['read-btn']}>返回首页</div>
    </main>);
  }
}

export default ResultPage;