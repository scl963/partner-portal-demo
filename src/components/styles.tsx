import { css } from 'react-emotion';

export const tablePageStyle = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: 90vh;
  @media (max-width: 1366px) {
    width: 100%;
  }
  @media (max-height: 800) {
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    margin-bottom: 80px;
  }
`;

export const tableContainerStyle = css`
  width: 80vw;
  min-height: 80vh;
  max-height: 80vh;
  margin-bottom: 10vh;
  background: white;
  border-radius: 1.5em;
  @media (max-width: 1366px) {
    width: 100%;
    border-radius: 1.5em;
    margin-bottom: 80px;
  }
  @media (max-height: 800) {
    width: 100%;
    height: 100%;
    margin-bottom: 80px;
  }
`;
