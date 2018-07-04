import homestore from "./homestore";
import bookstore from "./bookstore";
import routestore from "./routestore";
/**
 * 规整的页面所有功能的store
 * @param app
 */
let stores = (app) => {
  homestore(app);
  bookstore(app);
  routestore(app); 
};

export default stores;
