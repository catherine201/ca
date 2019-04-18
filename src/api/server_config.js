function resolveIp() {
  const mode = process.env.NODE_ENV.trim();
  if (mode === 'development') {
    return {
      login: '/log',
      thirdServer: '/third',
      logic: '/fangman',
      article: '/article'
    };
  }
  return {
    login: 'http://dash-passport-api.tbnb.io:10101',
    thirdServer: 'http://dash-otc-api.tbnb.io:10101',
    logic: 'http://dash-otc-api.tbnb.io:10101'
    // article: 'https://art-api.euen.io'
  };
}
export const serverIp = resolveIp();
