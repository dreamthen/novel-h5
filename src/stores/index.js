import homestore from "./homestore";
import bookstore from "./bookstore";
import rechargestore from "./rechargestore";
import routestore from "./routestore";
import synopsis from "./synopsisstore";
/**
 * 规整的页面所有功能的store
 * @param app
 */
let stores = (app) => {
  homestore(app);
  bookstore(app);
  rechargestore(app);
  routestore(app);
  synopsis(app);
};

export default stores;
