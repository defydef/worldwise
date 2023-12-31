import { createContext, useContext, useReducer } from "react";

const initialState = { user: null, isAuthenticated: false };

const FAKE_USER = {
  name: "Lisa",
  email: "lisa@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/80?img=44",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Undefined action");
  }
}

// 1) Create a new Context component
const AuthContext = createContext();

// 2) Provide context values to children components
function FakeAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({
        type: "login",
        payload: {
          email,
          password,
          name: FAKE_USER.name,
          avatar: FAKE_USER.avatar,
        },
      });
    else throw new Error("Incorrect email or password");
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(
      "useAuth is undefined because it's used outside the AuthProvider component"
    );
  return context;
}

export { FakeAuthProvider, useAuth };
