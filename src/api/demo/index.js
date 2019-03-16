import createApi from '../createApi';

const config = {
  // test
  test: {
    // test
    url: '/game/data',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: true
    }
  }
};

export default createApi(config);
