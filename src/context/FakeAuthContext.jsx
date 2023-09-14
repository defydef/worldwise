import { createContext } from "react";

// 1) Create a new Context component
const AuthContext = createContext();

// 2) Provide context values to children components
function AuthProvider({ children }) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(
      "useAuth is undefined because it's used outside the AuthProvider component"
    );
  return context;
}

export { AuthProvider, useAuth };
