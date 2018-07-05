let routestore = (app) => {
  app.model({
    namespace: "route",
    state: {
      codeDialog: false
    },
    effects: {
    },
    reducers: {
      save(state, { payload }) {
        return {
          ...state,
          ...payload
        };
      }
    }
  });
}

export default routestore;
