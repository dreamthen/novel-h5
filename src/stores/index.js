import homestore from "./homestore";
import bookstore from "./bookstore";
import rechargestore from "./rechargestore";
import routestore from "./routestore";
import synopsisstore from "./synopsisstore";
import chapterstore from "./chapterstore";
import readstore from "./readstore";
import historystore from "./historystore";
import personalstore from "./personalstore";
import recordstore from "./recordstore";
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
  readstore(app);
  historystore(app);
  personalstore(app);
  recordstore(app);
};

export default stores;
