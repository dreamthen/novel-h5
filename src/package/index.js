/**
 * 封装的类方法,封装此项目中用到的一些常用的方法
 */
const _package = (() => {
  let data_model = new WeakMap();

  class Package {
    constructor() {
      data_model.set(this, {});
    }

    /**
     * 生成32位随机字符串的方法
     */
    random32ToStringFunc() {
      let model_func_obj = data_model.get(this),
        random32ToString = ``;
      for (let i = 0; i < 32; i++) {
        random32ToString = `${random32ToString}${String.fromCharCode(Math.trunc(((Math.random() + 1) * 60 + 5)))}`;
      }
      model_func_obj = {
        random32ToString
      };
      data_model.set(this, model_func_obj);
    }

    /**(
     *  获取32位随机字符串的方法
     */
    getRandom32ToString() {
      const {random32ToStringFunc} = this;
      random32ToStringFunc.bind(this)();
      return data_model.get(this)["random32ToString"];
    }

    /**
     * 判断对象是否为空
     */
    isEmpty(obj) {
      if (typeof obj !== "object") {
        return true;
      }
      for (let [key, value] of Object.entries(obj)) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
  }

  return new Package();
})();

export default _package;
