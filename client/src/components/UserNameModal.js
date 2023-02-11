import { Input, Modal } from "./styled";

const UserNameModal = ({ setUerName, setIsNameSet, userName, socket }) => {
  const setUserName = (e) => {
    e.preventDefault();
    socket.emit("name", userName);
    setIsNameSet(true);
  };

  return (
    <Modal>
      <form onSubmit={setUserName}>
        <Input
          placeholder="Set User Name"
          type="text"
          value={userName}
          onChange={(e) => setUerName(e.target.value)}
        />
      </form>
    </Modal>
  );
};

export default UserNameModal;
