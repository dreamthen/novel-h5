import {connect} from 'dva';
import {Component} from 'react';
import styles from '../../stylesheets';
import qs from 'qs';
import assets from '../../assets';

const mapStateToProps = state => {
  return {
    chapter: state.chapter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset() {
      dispatch({
        type: 'chapter/reset'
      });
    },
    changeEnd: isEnd => {
      dispatch({
        type: 'chapter/save',
        payload: {
          isEnd
        }
      });
    },
    fetchChapters: params => {
      dispatch({
        type: 'chapter/fetchChapters',
        payload: params
      });
    }
  };
};

/**
 * @param {string} title - 小说标题,query string
 * @param {number} ficId - 小说ID,query string
 */
@connect(mapStateToProps, mapDispatchToProps)
class Chapter extends Component {

  /**
   * 组件装载完毕之后,拉取小说的章节资源
   */
  componentDidMount() {
    this.addScrollListener();
    const {fetchChapters, location, chapter: {pageSize}} = this.props;
    fetchChapters({page_num: 1, page_size: pageSize, fic_id: qs.parse(location.search.substr(1)).ficId});
  }

  /**
   * 在组件卸载完毕之后,重置页面至初始化状态
   */
  componentWillUnmount() {
    const {reset} = this.props;
    const {scrollChapter} = this;
    reset.bind(this)();
    window.removeEventListener('scroll', this.scrollChapter);
  }

  componentWillReceiveProps(nextProps, nextState) {
    let chapters = this.props.chapter.chapters,
      nextChapters = nextProps.chapter.chapters,
      nextIsEnd = nextProps.chapter.isEnd;
    const {changeEnd} = this.props;
    if (chapters.length !== nextChapters.length && nextIsEnd) {
      changeEnd(false);
    }
  }

  /**
   * 添加小说目录页滚动条分页
   */
  addScrollListener = () => {
    const {scrollChapter} = this;
    window.addEventListener('scroll', this.scrollChapter);
  }

  /**
   * 小说目录页滚动条分页系统
   */
  scrollChapter = () => {
    const {changeEnd, fetchChapters, chapter: {pageNum, pageSize, total, isEnd}, location} = this.props;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
      documentHeight = document.body.offsetHeight,
      windowHeight = window.innerHeight;
    let max_num = Math.ceil(total / pageSize);
    if ((documentHeight - (windowHeight + scrollTop)) / documentHeight <= 0.1) {
      if (!isEnd) {
        // 触发加载保护
        changeEnd(true);
        if (pageNum < max_num) {
          // 加载新目录页
          fetchChapters({
            page_num: pageNum + 1,
            page_size: pageSize,
            fic_id: qs.parse(location.search.substr(1)).ficId
          });
        }
      }
    }
  }

  onClickChapter = (ficId, serial) => {
    const {history} = this.props;
    history.push(`/read?ficId=${ficId}&serial=${serial}`);
  };

  render() {
    const {chapter: {chapters}, location} = this.props;
    const title = qs.parse(location.search.substr(1)).title;
    return (
      <main className={styles['chapter']['main']}>
        <section className={styles['chapter']['head-title']}>{title}</section>
        <section className={styles['chapter']['chapter']}>
          {
            chapters.length > 0 && chapters.map(val => {
              return <div key={val.id} className={styles['chapter']['chapter-item']}
                          onClick={this.onClickChapter.bind(null, val.fic_id, val.serial)}>
                <div>{val.title}</div>
                {
                  val.cost_balance > 0 ?
                    <img className={styles['chapter']['chapter-item-icon']} alt='loading' src={assets["cost"]}/> : null
                }
              </div>;
            })
          }
        </section>
      </main>
    );
  }
}

export default Chapter;
