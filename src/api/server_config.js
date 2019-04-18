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
    login: 'https://dash-api.tbnb.io:10101',
    thirdServer: 'https://dash-otc-api.tbnb.io:10101',
    logic: 'https://dash-otc-api.tbnb.io:10101'
    // article: 'https://art-api.euen.io'
  };
}
export const serverIp = resolveIp();
