export const getServerUrl = () => {
  if (process.env.NODE_ENV) {
    if (process.env.NODE_ENV === "production") {
      return process.env.REACT_APP_SERVER_URL;
    }
  }
  return "http://localhost:4000";
};
