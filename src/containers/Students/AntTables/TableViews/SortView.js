import React from 'react';
import clone from 'clone';
import TableWrapper from '../AntTables.styles';
import IntlMessages from '@iso/components/utility/intlMessages';
import { ShowStudentButton } from '@iso/components/Tables/HelperCells';

export default function(props) {

  const columns = createcolumns(clone(props.tableInfo.columns));
  const dataList = props.dataList;

  function createcolumns(columns) {

    const show_student = {
      title: <IntlMessages id="show_student" />,
      dataIndex: 'show_student',
      render: (text, record, index) => (
        <ShowStudentButton student_id={record.id} />
      ),
    };

    // const downloadExcelColumn = {
    //   title: <IntlMessages id="attendance_sheet" />,
    //   dataIndex: 'download_excel',
    //   render: (text, record, index) => (
    //     <DownloadExcel lecture_id={record} />
    //   ),
    // };
    columns.push(show_student);
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
