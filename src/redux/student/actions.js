const actions = {
  GET_STUDENT_REQUEST: 'GET_STUDENT_REQUEST',
  GET_STUDENT_SUCCESS: 'GET_STUDENT_SUCCESS',
  GET_STUDENT_ERROR: 'GET_STUDENT_ERROR',

  GET_STUDENT_WALLET_REQUEST: 'GET_STUDENT_WALLET_REQUEST',
  GET_STUDENT_WALLET_SUCCESS: 'GET_STUDENT_WALLET_SUCCESS',
  GET_STUDENT_WALLET_ERROR: 'GET_STUDENT_WALLET_ERROR',

  GET_STUDENT_TRANSACTIONS_REQUEST: 'GET_STUDENT_TRANSACTIONS_REQUEST',
  GET_STUDENT_TRANSACTIONS_SUCCESS: 'GET_STUDENT_TRANSACTIONS_SUCCESS',
  GET_STUDENT_TRANSACTIONS_ERROR: 'GET_STUDENT_TRANSACTIONS_ERROR',

  CHANGE_AMOUNT: "CHANGE_AMOUNT",
  RESET_AMOUNT: "RESET_AMOUNT",

  RECHARGE_STUDENT_WALLET_REQUEST: "RECHARGE_STUDENT_WALLET_REQUEST",
  RECHARGE_STUDENT_WALLET_SUCCESS: "RECHARGE_STUDENT_WALLET_SUCCESS",
  RECHARGE_STUDENT_WALLET_ERROR: "RECHARGE_STUDENT_WALLET_ERROR",

  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_MODAL: "OPEN_MODAL",

  fetchStudent: (student_id) => ({
    type: actions.GET_STUDENT_REQUEST,
    payload: { student_id }
  }),

  fetchStudentWallet: (student_id) => ({
    type: actions.GET_STUDENT_WALLET_REQUEST,
    payload: { student_id }
  }),

  fetchStudentTransactions: (student_id) => ({
    type: actions.GET_STUDENT_TRANSACTIONS_REQUEST,
    payload: { student_id }
  }),

  rechargeWalletRequest: (student_id) => ({
    type: actions.RECHARGE_STUDENT_WALLET_REQUEST,
    payload: { student_id }
  }),

  changeAmount: (amount) => ({
    type: actions.CHANGE_AMOUNT,
    payload: { amount }
  }),

  resetAmount: () => ({
    type: actions.RESET_AMOUNT,
  }),

  closeModal: () => ({
    type: actions.CLOSE_MODAL,
  }),

  openModal: () => ({
    type: actions.OPEN_MODAL,
  }),

};
export default actions;
