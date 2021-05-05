import React from 'react';
import WithdrawMarketBalance from './WithdrawMarketBalance';
import ShowStudentButton from './ShowStudentButton';

const DateCell = data => <p>{data.toLocaleString()}</p>;
const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>;
const TextCell = text => <p>{text}</p>;

export {
  DateCell,
  LinkCell,
  TextCell,
  WithdrawMarketBalance,
  ShowStudentButton
};
