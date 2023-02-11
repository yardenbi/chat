import { MessageContainer, MessageText, UserName } from "./styled";

const Message = ({ userName, message }) => (
  <MessageContainer gap={{ col: 10 }}>
    <UserName>{userName}:</UserName>
    <MessageText>{message}</MessageText>
  </MessageContainer>
);

export default Message;
