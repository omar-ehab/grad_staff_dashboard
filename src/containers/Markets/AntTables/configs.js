import React from 'react';
import IntlMessages from '@iso/components/utility/intlMessages';
import { TextCell } from '@iso/components/Tables/HelperCells';

const renderCell = (object, key) => {
  const value = object[key];
  return TextCell(value);
};

const columns = [
  {
    title: <IntlMessages id="market_name" />,
    key: 'market_name',
    render: object => renderCell(object, 'market_name'),
  },
  {
    title: <IntlMessages id="market_balance" />,
    key: 'market_balance',
    render: object => renderCell(object, 'market_balance'),
  }
];

const tableInfo = {
    title: 'Markets',
    value: 'simple',
    columns
  };
export { columns, tableInfo };
