const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return <div className={error === true ? "error" : "success"}>{message}</div>;
};

export default Notification;
