const config = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: {
      "x-access-token": user.accessToken,
    },
  };
};

export { config };
