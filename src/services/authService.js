const USERS_URL = "http://localhost:3001/users";

export const getUsers = async () => {
  const response = await fetch(USERS_URL);
  return response.json();
};

export const loginUser = async (username, password) => {
  const users = await getUsers();

  return users.find(
    (user) => user.username === username && user.password === password
  );
};

export const registerUser = async (username, password) => {
  const newUser = {
    username: username,
    password: password,
  };

  const response = await fetch(USERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  return response.json();
};

export const saveLogin = (username) => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", username);
};

export const getSavedLogin = () => {
  return {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    username: localStorage.getItem("username") || "",
  };
};

export const clearLogin = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
};
