import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Transaction from './Transaction';
import { SortableCardWrapper } from './Student.styles';
import { Row, Col } from 'antd';
import Modal from '@iso/components/Feedback/Modal';
import Input from '@iso/components/uielements/input';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import studentActions from '@iso/redux/student/actions';
import {useParams} from "react-router-dom";
import { Alert } from 'antd';
import { Button } from 'antd';
import { direction } from '@iso/lib/helpers/rtl';
import IntlMessages from '@iso/components/utility/intlMessages';
import basicStyle from '@iso/assets/styles/constants';
import StickerWidget from './Sticker/StickerWidget';
import IsoWidgetsWrapper from './WidgetsWrapper';

import {
  Fieldset,
  Form,
  Label,
} from './Student.styles';

const margin = {
  margin: direction === 'rtl' ? '0 0 20px 8px' : '0 8px 20px 0',
};


export default function () {
  const { rowStyle, colStyle } = basicStyle;
  

  const [amountError, setAmountError] = useState("");

  const openModal = () => {
    dispatch(studentActions.openModal());
  }

  const closeModal = () => {
    dispatch(studentActions.closeModal());
  }

  const onRecordChange = (e) => {
    if(/^\d*$/.test(e.target.value)){
      setAmountError("")
      dispatch(studentActions.changeAmount(e.target.value));
    } else {
      setAmountError("Please Enter Valid Amount");
      dispatch(studentActions.resetAmount());
    }
  }

  const recharge = () => {
    dispatch(studentActions.rechargeWalletRequest(student_id));
  }

  const { student_id, id } = useParams()

  const dispatch = useDispatch();

  const { student, transactions, error, transaction_error, recharge_error, recharge_amount, modalState, wallet } = useSelector(state => {
    return {
      student: state.student.student,
      transactions: state.student.transactions,
      error: state.student.error,
      transaction_error: state.student.transaction_error,
      recharge_amount: state.student.recharge_amount,
      recharge_error: state.student.recharge_error,
      modalState: state.student.modal_state,
      wallet: state.student.wallet,

    }
  });

  useEffect(() => {
    dispatch(studentActions.fetchStudent(id));
    dispatch(studentActions.fetchStudentWallet(student_id));
    dispatch(studentActions.fetchStudentTransactions(student_id));
  }, [dispatch, student_id]);

  function renderTransactions() {
    if(transactions.length){
      return transactions.map((transaction, i) => {
        return (
          <Transaction
            key={transaction.id}
            index={i}
            {...transaction}
          />
        );
      });
    } else {
      return (
        <p>There is no transactions for this student</p>
      )
    }
    
  }

  return (
    <LayoutContentWrapper>
      <Modal
            visible={modalState}
            onClose={closeModal}
            title="Recharge Student Balance"
            onCancel={closeModal}
            width={780}
            okText={'Recharge'}
            onOk={recharge}
      >
        <Form>
              { recharge_error.length ? <Alert message={recharge_error} type="error" style={{marginBottom: 10}}/> : "" }
              <Fieldset>
                <Label>Amount</Label>
                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  value={recharge_amount}
                  onChange={e => onRecordChange(e)}
                />
                { amountError.length ? <Alert message={amountError} type="error" style={{marginTop: 10}}/> : "" }
              </Fieldset>
            </Form>

      </Modal>
      { error.length ?
        <Row>
          <Col span={24}>
            <Alert message={error} type="error" style={{marginBottom: 10}}/>
          </Col>
        </Row>
      : "" }
      <Row>
        <Col span={24}>
          <Button type="primary" style={margin} onClick={openModal}>
            {<IntlMessages id="recharge_student_balance" />}
          </Button>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={12} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper style={{marginRight: "10px"}}>
              <StickerWidget
                number={wallet.available_balance}
                text="Balance"
                icon="ion-cash"
                fontColor="#FFF"
                bgColor="#42A5F6"
              />
            </IsoWidgetsWrapper>
          </Col>
          <Col lg={12} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <StickerWidget
                number={wallet.reward_point}
                text="Points"
                icon="ion-cash"
                fontColor="#FFF"
                bgColor="#7266BA"
              />
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      <Row>
        <Col span={12}>
          <p style={{ fontWeight: "bold" }}>ID: 
            <span style={{ fontWeight: "normal", marginLeft: "5px" }}>{student.id}</span>
          </p>
        </Col>
        <Col span={12}>
          <p style={{ fontWeight: "bold" }}>Name: 
            <span style={{ fontWeight: "normal", marginLeft: "5px" }}>{student.name}</span>
          </p>
        </Col>
        <Col span={12} style={{ marginTop: '10px' }}>
          <p style={{ fontWeight: "bold" }}>Email: 
            <span style={{ fontWeight: "normal", marginLeft: "5px" }}>{student.email}</span>
          </p>
        </Col>
        <Col span={12} style={{ marginTop: '10px' }}>
          <p style={{ fontWeight: "bold" }}>Birthdate: 
            <span style={{ fontWeight: "normal", marginLeft: "5px" }}>{student.birth_date}</span>
          </p>
        </Col>
        <Col span={12} style={{ marginTop: '10px' }}>
          <p style={{ fontWeight: "bold" }}>Mobile: 
            <span style={{ fontWeight: "normal", marginLeft: "5px" }}>{student.mobile}</span>
          </p>
        </Col>
        <Col span={12} style={{ marginTop: '10px' }}>
          <p style={{ fontWeight: "bold" }}>Parent Mobile: 
            <span style={{ fontWeight: "normal", marginLeft: "5px" }}>{student.parent_mobile}</span>
          </p>
        </Col>
      </Row>
      { error.length ?
        <Row>
          <Col span={24}>
            <Alert message={transaction_error} type="error" style={{marginBottom: 10}}/>
          </Col>
        </Row>
      : "" }
      <Row>
        <Col span={24}>
          <SortableCardWrapper
              id="shuffle"
              className={`isomorphicSortableCardsHolder list`}
            >
            <h2>Transactions</h2>
            <div className="isoSortableCardsContainer">
              {renderTransactions()}
            </div>
          </SortableCardWrapper>
        </Col>
      </Row>
    </LayoutContentWrapper>
  );
}
