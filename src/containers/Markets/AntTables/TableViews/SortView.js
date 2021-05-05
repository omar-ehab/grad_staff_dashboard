import React from 'react';
import clone from 'clone';
import TableWrapper from '../AntTables.styles';
import IntlMessages from '@iso/components/utility/intlMessages';
import { WithdrawMarketBalance } from '@iso/components/Tables/HelperCells';

export default function(props) {

  const columns = createcolumns(clone(props.tableInfo.columns));
  const dataList = props.dataList;

  function createcolumns(columns) {

    const withdraw_market_balance = {
      title: <IntlMessages id="withdraw_market_balance" />,
      dataIndex: 'withdraw_market_balance',
      render: (text, record, index) => (
        <WithdrawMarketBalance market={record} />
      ),
    };

    // const downloadExcelColumn = {
    //   title: <IntlMessages id="attendance_sheet" />,
    //   dataIndex: 'download_excel',
    //   render: (text, record, index) => (
    //     <DownloadExcel lecture_id={record} />
    //   ),
    // };
    columns.push(withdraw_market_balance);
    // columns.push(downloadExcelColumn);

    return columns;
  }
  
  return (
    <TableWrapper
      columns={columns}
      dataSource={dataList}
      pagination={{ pageSize: 10 }}
      className="isoSimpleTable"
    />
  );
}
