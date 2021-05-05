import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import axios from 'axios';
import Popconfirm from '../Feedback/Popconfirm';
import notifications from '../Feedback/Notification';
import { store } from '@iso/redux/store';
import marketsActions from '@iso/redux/markets/actions';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const handleWithdraw = ({market}) => {
  const market_balance = parseInt(market.market_balance.split(' ')[0])
  if(market_balance > 0) {
    const url = `http://127.0.0.1:8000/markets/${market.id}/withdraw`;
    axios({
      url,
      method: 'POST',
      data: {
        balance: market_balance
      }
    }).then((response) => {
      store.dispatch(marketsActions.resetMarketBalance(market.id));
      notifications['success']({
        message: 'Withdraw Done Successfully',
        description:
          `You have delivered the ${market.market_name} amount of ${market.market_balance}`,
      });
    });
  } else {
    notifications['error']({
      message: 'Withdraw Error',
      description:
        `${market.market_name} balance is 0 LE`,
    });
  }
}

export default function(market) {
  return (
    <Popconfirm
      title="Are you sure to withdraw the balance?"
      okText="Withdraw"
      cancelText="No"
      onConfirm={() => handleWithdraw(market)}
    >
      <Button type="primary" style={margin}>
        {<IntlMessages id="withdraw_market_balance" />}
      </Button>
    </Popconfirm>
  );
}
