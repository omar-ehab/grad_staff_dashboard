import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import { Link } from 'react-router-dom';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};


export default function({student_id}) {
  return (
    <Button type="primary" style={margin}>
      <Link style={{color: 'white'}} to={`students/${student_id}`}>
        <IntlMessages id="show_student" />
      </Link>
    </Button>
  );
}
