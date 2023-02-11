import styled, { css } from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  text-align: center;
  height: 100%;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

export const Input = styled.input`
  position: relative;
  width: 210px;
  height: 40px;
  box-shadow: inset 0 3px 5px 0 rgba(0, 0, 0, 0.03);
  background-color: #f4f4f4;
  border: solid 1px #e7e7e7;
  color: inherit;
  padding: 0px 16px;
  padding-left: 16px;
  border-radius: 10px;
`;

export const Button = styled.button`
  text-align: center;
  border-radius: 4px;
  background-color: #4c2c54;
  color: white;
  font-weight: 600;
  padding: 1%;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    font-weight: 900;
  }
`;

export const FlexRow = styled.div`
  ${({ gap, justifyContent, alignItems, width }) => {
    const gapValue = gap ? `${gap.row || 0}px ${gap.col || 0}px` : undefined;
    return css`
      display: flex;
      align-items: ${alignItems};
      justify-content: ${justifyContent};
      gap: ${gapValue};
      width: ${width || "100%"};
    `;
  }}
`;

export const FlexColumn = styled.div`
  ${({ gap, justifyContent, alignItems, width }) => {
    const gapValue = gap ? `${gap.row || 0}px ${gap.col || 0}px` : undefined;
    return css`
      display: flex;
      flex-direction: column;
      align-items: ${alignItems};
      justify-content: ${justifyContent};
      gap: ${gapValue};
      width: ${width || "100%"};
    `;
  }}
`;

export const ChatContainer = styled.div`
  width: 40%;
  height: 90vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  background-color: #e6f9ff;
`;

export const MassagesContainer = styled.div`
  height: 95%;
  overflow-y: scroll;
  background-color: transparent;

  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }
`;

export const MessageInputContainer = styled.form`
  height: auto;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid lightgray;
`;

export const MessageContainer = styled.div`
  width: 45%;
  background: antiquewhite;
  padding: 5px 15px;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin: 12px;
`;

export const UserName = styled.p`
  margin-top: 0;
  text-decoration: underline;
`;

export const MessageText = styled.p`
  margin-left: 12px;
  word-wrap: break-word;
  word-break: break-all;
`;
