import actions from './actions';

const initState = {
  markets: [],
  error: ""
};

 
export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_ALL_MARKETS_SUCCESS:
      const markets = payload.markets.map(mart => {
        return {
          id: mart.id,
          key: mart.id,
          market_name: mart.name,
          market_balance: `${mart.balance} LE`
        }
      })
      return {
        ...state,
        markets
      };
    case actions.GET_ALL_MARKETS_ERROR:
      return {
        ...state,
        error: payload.message
      };
    case actions.RESET_MARKET_BALANCE:
      const updatedMarkets = state.markets.map(mart => {
        if(mart.id === payload.marketId){
          return {
            id: mart.id,
            key: mart.id,
            market_name: mart.market_name,
            market_balance: `0 LE`
          }
        } else {
          return mart
        }
      })
      return {
        ...state,
        markets: updatedMarkets
      };
    default:
      return state;
  }
}
