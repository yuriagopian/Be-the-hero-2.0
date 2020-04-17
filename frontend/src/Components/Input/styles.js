import styled from 'styled-components';

import colors from '../../styles/colors';

export const TInput = styled.input`
  width: 100%;
  height: 66px;
  color: ${({ theme }) => theme.colors.textStrong};
  padding: 0 24px;
  margin-top: 32px;
  border-radius: 8px;
  border: 1px solid ${colors.border};
  background: ${({ theme }) => theme.colors.CardBackground};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  span.error {
    margin: 15px 0 5px;
    align-self: flex-start;
    font-weight: bold;
    color: ${colors.primary};
    animation: 300ms ease-out 0s 1 slideInFromLeft;
    word-wrap: break-word;
  }
 
`;
