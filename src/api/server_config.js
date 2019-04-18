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
    login: 'https://dash-api.leekerlabs.com',
    thirdServer: 'https://dash-otc-api.leekerlabs.com',
    logic: 'https://dash-otc-api.leekerlabs.com'
    // article: 'https://art-api.euen.io'
  };
}
export const serverIp = resolveIp();
