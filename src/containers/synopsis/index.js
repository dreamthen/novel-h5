import React, {Component} from "react";
import {connect} from 'dva';
import styles from '../../stylesheets';
import bookImg from '../../assets/book.png';
import descImg from '../../assets/desc.png';
import costImg from '../../assets/cost.png';
import qs from 'qs';

@connect(state => {
  return {
    synopsis: state.synopsis
  };
})
class Synopsis extends Component {

  componentDidMount() {
    const { location } = this.props;
    const ficId = qs.parse(location.search.substr(1)).ficId;
    const { dispatch } = this.props;
    dispatch({
      type: 'synopsis/fetchFiction',
      payload: {
        ficId
      }
    });
    dispatch({
      type: 'synopsis/fetchChapters',
      payload: {
        ficId
      }
    });
  }

  onRead = () => {
    const { history, synopsis: {fiction}} = this.props;
    history.push(`/read?ficId=${fiction.id}&serial=1`);
  };

  onClickChapter = serial => {
    const { history, synopsis: {fiction}} = this.props;
    history.push(`/read?ficId=${fiction.id}&serial=${serial}`);
  };

  onAllChapterClick = ficId => {
    const { history, synopsis: {fiction: {title}}} = this.props;
    history.push(`/chapter?ficId=${ficId}&title=${title}`);
  };

  render() {
    const { synopsis: {chapters, fiction}} = this.props;
    return (<main style={{backgroundColor: 'white', minHeight: '100vh'}}>
      <header className={styles['synopsis']['head']}>
        <div className={styles['synopsis']['head-avatar']}>
          <img alt='loading' className={styles['synopsis']['head-avatar-img']} src={fiction.avatar}/>
        </div>
        <div className={styles['synopsis']['head-info']}>
          <div className={styles['synopsis']['head-info-title']}>{fiction.title}</div>
          <div className={`${styles['synopsis']['head-info-item']} ${styles['synopsis']['first-item']}`}>作者：{fiction.artist}</div>
          <div className={styles['synopsis']['head-info-item']}>状态：{fiction.goingStatus}</div>
        </div>
      </header>
      <section className={styles['synopsis']['desc']}>
        <div className={styles['synopsis']['desc-title']}>
          <img alt='loading' className={styles['synopsis']['desc-title-icon']} src={descImg}/>
          <span>简介</span>
        </div>
        <div className={styles['synopsis']['desc-content']}>
          {
            fiction.description
          }
        </div>
        <div className={styles['synopsis']['desc-read-btn']} onClick={this.onRead}>开始阅读</div>
      </section>
      <section className={styles['synopsis']['catalog']}>
        <div className={styles['synopsis']['catalog-title']}>
          <img alt='loading' className={styles['synopsis']['catalog-title-icon']} src={bookImg}/>
          <span>章节</span>
        </div>
        <div className={styles['synopsis']['catalog-chapter']}>
          {
            chapters.map(val => {
              return <div key={val.id} className={styles['synopsis']['catalog-chapter-item']} onClick={this.onClickChapter.bind(null, val.serial)}>
                <div>{`${val.title}`}</div>
                {
                  val.costBalance > 0 ? <img alt='loading' className={styles['synopsis']['catalog-chapter-item-icon']} src={costImg}/> : null
                }
              </div>;
            })
          }
        </div>
        <div className={styles['synopsis']['catalog-all-btn']} onClick={this.onAllChapterClick.bind(null, fiction.id)}><a href="">全部章节</a></div>
      </section>
    </main>);
  }
}

export default Synopsis;
