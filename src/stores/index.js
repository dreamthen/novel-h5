import homestore from "./homestore";
import bookstore from "./bookstore";

/**
 * 规整的页面所有功能的store
 * @param app
 */
let stores = (app) => {
  homestore(app);
  bookstore(app);
};

export default stores;
