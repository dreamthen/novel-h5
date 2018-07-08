import homestore from "./homestore";
import bookstore from "./bookstore";
import rechargestore from "./rechargestore";
import routestore from "./routestore";
import synopsisstore from "./synopsisstore";
import chapterstore from "./chapterstore";
import readsotre from "./readstore";
import historystore from "./historystore";
/**
 * 规整的页面所有功能的store
 * @param app
 */
let stores = (app) => {
  homestore(app);
  bookstore(app);
  rechargestore(app);
  routestore(app);
  synopsisstore(app); 
  chapterstore(app);
  readsotre(app);
  historystore(app);
};

export default stores;
