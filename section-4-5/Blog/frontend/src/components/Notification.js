
const Notification = ({ message }) => {
  if (!message.value) {
    return null;
  }
  return (
    <h1 className={message.error && 'error'}>
      {message.value}
    </h1>
  );
};

export default Notification;
