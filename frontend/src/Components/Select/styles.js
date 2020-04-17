import styled from "styled-components";
import colors from '../../styles/colors';
import { darken } from 'polished';

export const Select = styled.select`
width: 100%;
height: 66px;
color: ${({ theme }) => theme.colors.textStrong};
padding: 0 4px;
margin-top: 9px;
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

