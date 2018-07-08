import {connect} from 'dva';
import {Component} from 'react';
import styles from '../../stylesheets';
import { List, SwipeAction } from 'antd-mobile';

const mapStateToProps = state => {
  return {
    readhistory: state['readhistory']
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHistories: () => {
      dispatch({
        type: 'readhistory/fetchHistories'
      });
    },
    deleteHistory: id => {
      dispatch({
        type: 'readhistory/deleteHistory',
        payload: {
          id
        }
      });
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class History extends Component {


  onHistoryClick = (ficId, serial) => {
    const { history } = this.props;
    history.push(`/read?ficId=${ficId}&serial=${serial}`);
  };

  componentDidMount() {
    this.props.fetchHistories();
  }

  render() {
    const { readhistory: {histories}, deleteHistory} = this.props;
    return (<main className={styles['history']['main']}>
      <section className={styles['history']['head']}>阅读记录</section>
      <section className={styles['history']['history']}>
        <List>
          {
            histories.length > 0 && histories.map(val => {
              return <SwipeAction
                key={val.id}
                autoClose
                right={[{
                  text: '删除',
                  onPress: () => {deleteHistory(val.id);},
                  style: {color: 'white', backgroundColor: '#F4333C'}
                }]}
              >
                <List.Item
                  className={styles['history']['history-item']}
                  onClick={this.onHistoryClick.bind(null, val.fic_id, val.serial)}
                  extra='操作'
                  arrow='horizontal'
                >
                  <span className={styles['history']['history-item-title']}>{val.title}</span>
                  <span className={styles['history']['history-item-serial']}>第{val.serial}章</span>
                </List.Item>
              </SwipeAction>;
            })
          }
        </List>
      </section>
    </main>);
  }
}

export default History;