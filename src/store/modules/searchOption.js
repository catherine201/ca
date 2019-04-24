const defaultPagination = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  current: 1
};

const searchOptionState = {
  state: {
    pagination:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).searchOption.pagination) ||
      defaultPagination,
    searchObj:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).searchOption.searchObj) ||
      {}
  },
  reducers: {
    setPagination(state, data) {
      return {
        ...state,
        pagination: data
      };
    },
    setSearchObj(state, data) {
      return {
        ...state,
        searchObj: data
      };
    }
  },
  effects: dispatch => ({
    getPagination(obj) {
      dispatch.searchOption.setPagination(obj);
    },
    resetPagination() {
      dispatch.searchOption.setPagination(defaultPagination);
    },
    getSearchObj(obj) {
      dispatch.searchOption.setSearchObj(obj);
    },
    resetSearchObj() {
      dispatch.searchOption.setSearchObj({});
    }
  })
};

export default searchOptionState;
