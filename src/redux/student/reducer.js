import actions from './actions';

const initState = {
  student: {},
  transactions: [],
  wallet: {
    available_balance: 0,
    blocked_balance: 0,
    reward_point: 0,
  },
  error: "",
  transaction_error: "",
  recharge_amount: "",
  recharge_error: "",
  modal_state: false
};

 
export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_STUDENT_SUCCESS:
      return {
        ...state,
        student: {
          id: payload.student.id,
          card_id: payload.student.card_id,
          name: payload.student.name,
          email: payload.student.email,
          birth_date: payload.student.birth_date,
          mobile: payload.student.student_phone_number,
          parent_mobile: payload.student.parent_phone_number,
        }
      };
    case actions.GET_ALL_STUDENTS_ERROR:
      return {
        ...state,
        error: payload.message
      };
    case actions.GET_STUDENT_WALLET_SUCCESS:
      return {
        ...state,
        wallet: payload.wallet
      };
    case actions.GET_STUDENT_WALLET_ERROR:
      return {
        ...state,
        error: payload.message
      };
    case actions.GET_STUDENT_TRANSACTIONS_SUCCESS:
      const transactions = payload.transactions.map(transaction => {
        return {
          id: transaction.id,
          accepted_at: transaction.accepted_at,
          amount: `${transaction.amount} LE`,
          type: transaction.type,
        }
      });
      return {
        ...state,
        transactions
      };
    case actions.GET_STUDENT_TRANSACTIONS_ERROR:
      return {
        ...state,
        transaction_error: payload.message
      };
    case actions.RECHARGE_STUDENT_WALLET_SUCCESS:
      return {
        ...state,
        transactions: [{
          id: payload.transaction.id,
          accepted_at: payload.transaction.accepted_at,
          amount: `${payload.transaction.amount} LE`,
          type: payload.transaction.type
        }, ...state.transactions]
      };
    case actions.RECHARGE_STUDENT_WALLET_ERROR:
      return {
        ...state,
        recharge_error: payload.message
      };
    case actions.CHANGE_AMOUNT:
      return {
        ...state,
        recharge_amount: payload.amount
      };
    case actions.RESET_AMOUNT:
      return {
        ...state,
        recharge_amount: ""
      };
    case actions.CLOSE_MODAL:
      return {
        ...state,
        modal_state: false
      };
    case actions.OPEN_MODAL:
      return {
        ...state,
        modal_state: true
      };
    default:
      return state;
  }
}
