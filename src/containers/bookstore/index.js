import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";
import code from "../../static/code";
import styles from "../../stylesheets";

class BookStore extends Component {
  static propTypes = {
    bookstore: PropTypes.object
  };

  /**
   * 组件装载完毕之后,拉取所有小说分类列表
   */
  componentDidMount() {
    const {getClassifications} = this.props;
    getClassifications.bind(this)();
  }

  /**
   * 分类改变样式监听
   */
  categoriesChangeHandler(key, index, e) {
    const {changeCategories} = this.props;
    changeCategories.bind(this)({[key]: index});
    //取消冒泡事件
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const {bookstore} = this.props;
    const {classifications, categories, update} = bookstore;
    const {categoriesChangeHandler} = this;
    return (
      <section className={styles["bookstore"]["bookstore"]}>
        <header className={styles["bookstore"]["bookstore-header"]}>
          <nav className={styles["bookstore"]["bookstore-header-nav"]}>
            <input
              type="text"
              className={styles["bookstore"]["bookstore-header-nav-search"]}
              placeholder="请输入书名"
            />
            <button className={styles["bookstore"]["bookstore-header-nav-button"]}>搜索</button>
          </nav>
          <section className={styles["bookstore"]["bookstore-header-categories"]}>
            <div className={styles["bookstore"]["bookstore-header-categories-item"]}>
              <dfn>分类: </dfn>
              <aside className={styles["bookstore"]["bookstore-header-categories-item-aside"]}>
                {
                  classifications.map((classificationItem, classificationIndex) => {
                    return (
                      <span key={classificationIndex}
                            className={classificationIndex === categories ? styles["bookstore"]["bookstore-header-categories-item-aside-selected"] : ""}
                            onClick={categoriesChangeHandler.bind(this, "categories", classificationIndex)}
                      >
                      {classificationItem["title"]}
                    </span>
                    )
                  })
                }
              </aside>
            </div>
            <div className={styles["bookstore"]["bookstore-header-categories-item"]}>
              <dfn>更新: </dfn>
              <aside className={styles["bookstore"]["bookstore-header-categories-item-aside"]}>
                {
                  code["categories_update"].map((updateItem, updateIndex) => {
                    return (
                      <span key={updateIndex}
                            className={updateIndex === update ? styles["bookstore"]["bookstore-header-categories-item-aside-selected"] : ""}
                            onClick={categoriesChangeHandler.bind(this, "update", updateIndex)}
                      >
                      {updateItem["title"]}
                    </span>
                    )
                  })
                }
              </aside>
            </div>
          </section>
        </header>
        <main>

        </main>
      </section>
    )
  }
}

const BookStoreComponent = connect(function mapStateToProps(state) {
  return {
    bookstore: state.bookstore
  }
}, function mapDispatchToProps(dispatch) {
  return {
    /**
     * 拉取所有小说分类列表
     */
    getClassifications() {
      dispatch({
        type: 'bookstore/classifications',
        payload: {}
      });
    },

    /**
     * 分类改变样式监听
     */
    changeCategories(payload) {
      dispatch({
        type: 'bookstore/categoriesChangeAction',
        payload
      });
    }
  }
})(BookStore);

export default BookStoreComponent;
