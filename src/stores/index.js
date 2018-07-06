import homestore from "./homestore";
import bookstore from "./bookstore";
import rechargestore from "./rechargestore";

/**
 * 规整的页面所有功能的store
 * @param app
 */
let stores = (app) => {
  homestore(app);
  bookstore(app);
  rechargestore(app);
};

export default stores;
