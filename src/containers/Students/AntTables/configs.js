import React from 'react';
import IntlMessages from '@iso/components/utility/intlMessages';
import { TextCell } from '@iso/components/Tables/HelperCells';

const renderCell = (object, key) => {
  const value = object[key];
  return TextCell(value);
};

const columns = [
  {
    title: <IntlMessages id="id" />,
    key: 'id',
    render: object => renderCell(object, 'id')
  },
  {
    title: <IntlMessages id="name" />,
    key: 'name',
    render: object => renderCell(object, 'name')
  },
  {
    title: <IntlMessages id="email" />,
    key: 'email',
    render: object => renderCell(object, 'email')
  },
  {
    title: <IntlMessages id="mobile" />,
    key: 'mobile',
    render: object => renderCell(object, 'mobile')
  }
];

const tableInfo = {
    title: 'Students',
    value: 'simple',
    columns
  };
export { columns, tableInfo };
