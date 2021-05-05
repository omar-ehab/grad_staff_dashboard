import styled from 'styled-components';
import { palette } from 'styled-theme';
import {
  transition,
  borderRadius,
  boxShadow,
} from '@iso/lib/helpers/style_utils';
import WithDirection from '@iso/lib/helpers/rtl';

const WDSingleCardWrapper = styled.li`
  padding: 15px;
  background-color: #ffffff;
  position: relative;
  margin-bottom: 5px;
  ${boxShadow('0 0 1px rgba(0,0,0,0.15)')};

  .isoCardContent {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 15px;

    .isoCardTitle {
      font-size: 14px;
      font-weight: 500;
      color: ${palette('text', 0)};
      margin: 0 0 3px;
    }

    .isoCardDate {
      font-size: 12px;
      font-weight: 400;
      color: ${palette('grayscale', 0)};
    }
  }

  &.list {
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const WDSortableCardWrapper = styled.div`
  padding: 50px 0px;

  @media only screen and (max-width: 767px) {
    padding: 30px 20px;
  }

  .isoControlBar {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    align-items: start;

    > * {
      display: flex;
      align-items: center;

      .isoControlBtn {
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
        color: #ffffff;
        background-color: ${palette('primary', 0)};
        border: 0;
        outline: 0;
        display: -webkit-inline-flex;
        display: -ms-inline-flex;
        display: inline-flex;
        align-items: center;
        height: 35px;
        padding: 0 15px;
        margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '10px')};
        margin-left: ${props => (props['data-rtl'] === 'rtl' ? '10px' : '0')};
        cursor: pointer;
        ${borderRadius('3px')};
        ${transition()};

        @media only screen and (max-width: 430px) {
          padding: 0 10px;
        }

        i {
          padding-right: ${props =>
            props['data-rtl'] === 'rtl' ? '0' : '10px'};
          padding-left: ${props =>
            props['data-rtl'] === 'rtl' ? '10px' : '0'};
        }

        &:last-child {
          margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '0')};
          margin-left: ${props => (props['data-rtl'] === 'rtl' ? '0' : '0')};
        }

        &:hover {
          background-color: ${palette('primary', 1)};
        }
      }

      &.isoControlBtnGroup {
        margin-left: ${props =>
          props['data-rtl'] === 'rtl' ? 'inherit' : 'auto'};
        margin-right: ${props =>
          props['data-rtl'] === 'rtl' ? 'auto' : 'inherit'};

        @media only screen and (max-width: 767px) {
          margin-left: ${props =>
            props['data-rtl'] === 'rtl' ? 'inherit' : '0'};
          margin-right: ${props =>
            props['data-rtl'] === 'rtl' ? '0' : 'inherit'};
          margin-top: 20px;
        }
      }
    }
  }

  .isoAddRemoveControlBar {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .isoControlBtnGroup {
      display: flex;
      align-items: center;

      .isoControlBtn {
        font-size: 12px;
        font-weight: 400;
        padding: 0;
        text-transform: uppercase;
        color: #ffffff;
        background-color: ${palette('primary', 0)};
        border: 0;
        outline: 0;
        height: 30px;
        padding: 0 15px;
        margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '10px')};
        margin-left: ${props => (props['data-rtl'] === 'rtl' ? '10px' : '0')};
        cursor: pointer;
        ${borderRadius('3px')};
        ${transition()};

        i {
          padding-right: ${props =>
            props['data-rtl'] === 'rtl' ? '0' : '10px'};
          padding-left: ${props =>
            props['data-rtl'] === 'rtl' ? '10px' : '0'};
        }

        &:last-child {
          margin: 0;
        }

        &:hover {
          background-color: ${palette('primary', 1)};
        }
      }
    }
  }

  &.grid {
    .isoSortableCardsContainer {
      ul {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
      }
    }
  }
`;

export const Fieldset = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  font-size: 13px;
  color: ${palette('text', 1)};
  line-height: 1.5;
  font-weight: 500;
  padding: 0;
  margin: 0 0 8px;
`;

export const Form = styled.div``;
const SingleCardWrapper = WithDirection(WDSingleCardWrapper);
const SortableCardWrapper = WithDirection(WDSortableCardWrapper);

export { SingleCardWrapper, SortableCardWrapper };
