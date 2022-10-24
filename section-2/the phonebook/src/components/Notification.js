
const Notification = ({ message }) => {
  const { msg, sucessful } = message;
  const notificationStyle = {
    backgroundColor: 'grey',
    color: sucessful ? 'green' : 'red',
    fontSize: 20,
    padding: 10,
    border: `2px solid ${sucessful ? 'green' : 'red'}`,
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