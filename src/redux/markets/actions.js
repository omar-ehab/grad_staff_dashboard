const actions = {
  GET_ALL_MARKETS_REQUEST: 'GET_ALL_MARKETS_REQUEST',
  GET_ALL_MARKETS_SUCCESS: 'GET_ALL_MARKETS_SUCCESS',
  GET_ALL_MARKETS_ERROR: 'GET_ALL_MARKETS_ERROR',
  RESET_MARKET_BALANCE: "RESET_MARKET_BALANCE",

  fetchMarkets: () => ({
    type: actions.GET_ALL_MARKETS_REQUEST
  }),

  resetMarketBalance: (marketId) => ({
    type: actions.RESET_MARKET_BALANCE,
    payload: { marketId }
  })
};
export default actions;
