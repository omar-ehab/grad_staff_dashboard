import React, { useEffect } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import TableDemoStyle from './Demo.styles';
import { tableInfo } from './configs';
import * as TableViews from './TableViews/TableViews';
import studentsActions from '@iso/redux/students/actions';
import { Alert } from 'antd';


export default function AntTable() {
  
  const dispatch = useDispatch();

  const { students, error } = useSelector(state => {
    return {
      students: state.students.students,
      error: state.students.error
    }
  });

  useEffect(() => {
    dispatch(studentsActions.fetchStudents());
  }, [dispatch]);

  function renderTable(tableInfo, data) {
    const Component = TableViews.SortView;
    return <Component tableInfo={tableInfo} dataList={data} />;
  }

  return (
    <LayoutContentWrapper>
      <Row>
        <Col span={24}>
          <h2>STUDENTS</h2>
        </Col>
      </Row>
      { error.length ?
        <Row>
          <Col span={24}>
            <Alert message={error} type="error" style={{marginBottom: 10}}/>
          </Col>
        </Row>
      : "" }
      <TableDemoStyle className="isoLayoutContent">
        {renderTable(tableInfo, students)}
      </TableDemoStyle>
    </LayoutContentWrapper>
  );
}

export { TableViews, tableInfo };
