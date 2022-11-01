
const Notification = ({ message }) => {
  const { msg, sucessful } = message;
  const notificationStyle = {
    backgroundColor: 'lightGrey',
    color: sucessful ? 'green' : '#D90000',
    fontSize: 20,
    padding: 10,
    border: `2px solid ${sucessful ? 'green' : '#D90000'}`,
    borderRadius: 20,
  }


  if (msg === null) {
    return null;
  }

  return (
    <div style={notificationStyle}>
      {msg}
    </div>
  );



}

export default Notification;