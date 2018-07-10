import {connect} from 'dva';
import {Component} from 'react';
import {Result} from 'antd-mobile';
import styles from '../../stylesheets';
import assets from '../../assets';
import qs from 'qs';

const resultMap = {
  success: {
    img: assets["success"]
  }
};

const mapResultToImg = result => {
  return resultMap[result].img;
};

const myImg = src => <img src={src} className={styles['result']['spe']} alt="" />;

@connect()
class ResultPage extends Component {

  onReturnClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { location } = this.props;
    const params = qs.parse(location.search.substr(1));
    return (<main className={styles['result']['main']}>
      <Result
        img={myImg(mapResultToImg(params.result))}
        title={params.title || '成功'}
      />
      <div className={styles['result']['read-btn']} onClick={this.onReturnClick}>返回首页</div>
    </main>);
  }
}

export default ResultPage;
