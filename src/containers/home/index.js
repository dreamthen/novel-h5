import React, {Component} from "react";
import {connect} from "dva";
import {Carousel} from "react-responsive-carousel";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/main.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../../stylesheets";

@connect(function mapStateToProps(state) {
  return {
    home: state.home
  }
}, function mapDispatchToProps(dispatch) {
  return {
    /**
     * 拉取首页小说资源列表
     */
    getIndexfictions() {
      dispatch({
        type: 'home/indexfictions',
        payload: {}
      });
    }
  }
})

class HomePage extends Component {
  static propTypes = {
    home: PropTypes.object
  };

  onFictionClick = ficId => {
    const {history} = this.props;
    history.push(`/synopsis?ficId=${ficId}`);
  };

  /**
   * 首页组件装载完毕之后,拉取首页小说资源
   */
  componentDidMount() {
    const {getIndexfictions} = this.props;
    getIndexfictions.bind(this)();
  }

  render() {
    const {home} = this.props;
    let {banner_fictions, recommend_fictions, fantasy_fictions, girl_fictions, love_fictions} = home;
    return (
      <section className={styles["home"]["home"]}>
        {/*showArrows: 是否显示左右两个前进和后退轮播器按钮*/}
        {/*showStatus: 是否显示状态文本*/}
        {/*showThumbs: 是否显示缩略图*/}
        {
          banner_fictions.length > 0 &&
          <Carousel showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    interval={3000}
          >
            {
              banner_fictions.map((fictionItem, fictionIndex) => {
                return (
                  <div key={fictionIndex}
                       onClick={this.onFictionClick.bind(null, fictionItem["id"])}
                       className="home-slide-item"
                  >
                    <div className="home-slide-item-img-wrap">
                      <img className="home-slide-item-img" src={fictionItem["avatar"]} alt={fictionItem["title"]}/>
                    </div>
                    <aside className="home-aside">
                      <h3 className="home-aside-title">{fictionItem["title"]}</h3>
                      <p className="home-aside-paragraph">{fictionItem["description"]}</p>
                    </aside>
                  </div>
                )
              })
            }
          </Carousel>
        }
        <section className={styles["home"]["home-hot-recommend"]}>
          <h3 className={styles["home"]["home-hot-recommend-title"]}>热门推荐</h3>
          <main className={styles["home"]["home-hot-recommend-main"]}>
            {
              recommend_fictions.length > 0 &&
              recommend_fictions.slice(0, 3).map((recommendItem, recommendIndex) => {
                return (
                  <div key={recommendIndex} className={styles["home"]["home-hot-recommend-main-item"]}
                       onClick={this.onFictionClick.bind(null, recommendItem["id"])}>
                    <img src={recommendItem["avatar"]} alt={recommendItem["title"]}/>
                    <p className={styles["home"]["home-hot-recommend-main-item-paragraph"]}>{recommendItem["title"]}</p>
                  </div>
                )
              })
            }
          </main>
          <aside className={styles["home"]["home-hot-recommend-aside"]}>
            {
              recommend_fictions.length > 0 &&
              recommend_fictions.slice(3).map((recommendItem, recommendIndex) => {
                return (
                  <div key={recommendIndex} className={styles["home"]["home-hot-recommend-aside-other"]}
                       onClick={this.onFictionClick.bind(null, recommendItem["id"])}>
                    <p>{recommendItem["title"]}</p>
                  </div>
                )
              })
            }
          </aside>
        </section>
        <div className={`${styles["home"]["home-hot-other"]} ${styles["home"]["home-hot-other-fantasy"]}`}>
          <h3 className={styles["home"]["home-hot-other-title"]}>玄幻精品</h3>
          <main className={styles["home"]["home-hot-other-main"]}>
            {
              fantasy_fictions.length > 0 &&
              fantasy_fictions.slice(0, 1).map((fantasyItem, fantasyIndex) => {
                return (
                  <div key={fantasyIndex} className={styles["home"]["home-hot-other-main-item"]}
                       onClick={this.onFictionClick.bind(null, fantasyItem["id"])}>
                    <img src={fantasyItem["avatar"]} alt={fantasyItem["title"]}/>
                    <aside className={styles["home"]["home-hot-other-main-item-aside"]}>
                      <h3 className={styles["home"]["home-hot-other-main-item-aside-title"]}>{fantasyItem["title"]}</h3>
                      <p
                        className={styles["home"]["home-hot-other-main-item-aside-paragraph"]}>
                        {fantasyItem["description"]}
                      </p>
                    </aside>
                  </div>
                )
              })
            }
          </main>
          <aside className={styles["home"]["home-hot-other-aside"]}>
            {
              fantasy_fictions.length > 0 &&
              fantasy_fictions.slice(1).map((fantasyItem, fantasyIndex) => {
                return (
                  <div key={fantasyIndex} className={styles["home"]["home-hot-other-aside-other"]}
                       onClick={this.onFictionClick.bind(null, fantasyItem["id"])}>
                    <p>{fantasyItem["title"]}</p>
                  </div>
                )
              })
            }
          </aside>
        </div>
        <section className={`${styles["home"]["home-hot-other"]} ${styles["home"]["home-hot-other-girl"]}`}>
          <h3 className={styles["home"]["home-hot-other-title"]}>女生频道</h3>
          <main className={styles["home"]["home-hot-other-main"]}>
            {
              girl_fictions.length > 0 &&
              girl_fictions.slice(0, 1).map((girlItem, girlIndex) => {
                return (
                  <div key={girlIndex} className={styles["home"]["home-hot-other-main-item"]}
                       onClick={this.onFictionClick.bind(null, girlItem["id"])}>
                    <img src={girlItem["avatar"]} alt={girlItem["title"]}/>
                    <aside className={styles["home"]["home-hot-other-main-item-aside"]}>
                      <h3 className={styles["home"]["home-hot-other-main-item-aside-title"]}>{girlItem["title"]}</h3>
                      <p
                        className={styles["home"]["home-hot-other-main-item-aside-paragraph"]}>
                        {girlItem["description"]}
                      </p>
                    </aside>
                  </div>
                )
              })
            }
          </main>
          <aside className={styles["home"]["home-hot-other-aside"]}>
            {
              girl_fictions.length > 0 &&
              girl_fictions.slice(1).map((girlItem, girlIndex) => {
                return (
                  <div key={girlIndex} className={styles["home"]["home-hot-other-aside-other"]}
                       onClick={this.onFictionClick.bind(null, girlItem["id"])}>
                    <p>{girlItem["title"]}</p>
                  </div>
                )
              })
            }
          </aside>
        </section>
        <section className={`${styles["home"]["home-hot-other"]} ${styles["home"]["home-hot-other-love"]}`}>
          <h3 className={styles["home"]["home-hot-other-title"]}>言情小说</h3>
          <main className={styles["home"]["home-hot-other-main"]}>
            {
              love_fictions.length > 0 &&
              love_fictions.slice(0, 1).map((loveItem, loveIndex) => {
                return (
                  <div key={loveIndex} className={styles["home"]["home-hot-other-main-item"]}
                       onClick={this.onFictionClick.bind(null, loveItem["id"])}>
                    <img src={loveItem["avatar"]} alt={loveItem["title"]}/>
                    <aside className={styles["home"]["home-hot-other-main-item-aside"]}>
                      <h3 className={styles["home"]["home-hot-other-main-item-aside-title"]}>{loveItem["title"]}</h3>
                      <p
                        className={styles["home"]["home-hot-other-main-item-aside-paragraph"]}>
                        {loveItem["description"]}
                      </p>
                    </aside>
                  </div>
                )
              })
            }
          </main>
          <aside className={styles["home"]["home-hot-other-aside"]}>
            {
              love_fictions.length > 0 &&
              love_fictions.slice(1).map((loveItem, loveIndex) => {
                return (
                  <div key={loveIndex} className={styles["home"]["home-hot-other-aside-other"]}
                       onClick={this.onFictionClick.bind(null, loveItem["id"])}>
                    <p>{loveItem["title"]}</p>
                  </div>
                )
              })
            }
          </aside>
        </section>
      </section>
    )
  }
}

export default HomePage;
