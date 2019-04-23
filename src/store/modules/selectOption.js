import createApi from '../../api/list';

const selectOptionState = {
  state: {
    coinType:
      sessionStorage.getItem('store') &&
      JSON.parse(sessionStorage.getItem('store')).selectOption.coinType,
    bankType:
      sessionStorage.getItem('store') &&
      JSON.parse(sessionStorage.getItem('store')).selectOption.bankType
  },
  reducers: {
    setCoinType(state, data) {
      return {
        ...state,
        coinType: data
      };
    },
    setBankType(state, data) {
      return {
        ...state,
        bankType: data
      };
    }
  },
  effects: dispatch => ({
    async getCoinType() {
      const res = await createApi.queryListCoins();
      if (res.datas) {
        const data = [
          // {
          //   code: '请选择币种'
          // },
          ...res.datas
        ];
        dispatch.selectOption.setCoinType(data);
        return new Promise(resolve => resolve());
      }
    },
    async getBankType() {
      const res = await createApi.queryBankType();
      if (res.datas) {
        const data = [
          {
            name: '全部',
            id: ''
          },
          ...res.datas
        ];
        dispatch.selectOption.setBankType(data);
        return new Promise(resolve => resolve());
      }
    }
  })
};

export default selectOptionState;
