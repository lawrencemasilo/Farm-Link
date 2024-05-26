import {useState, createContext} from 'react';

// Creating a context for authentication-related state
export const AuthContext = createContext(
  {
    // Default values and functions to update the states
    user: {},
    setUser: () => {},
    token: null,
    setToken: () => {}
  }
)

// Context provider component for authentication-related state
export function AuthContextProvider(props) {
// Setting up local state within the context provider
  const [user, setUser] = useState({});
  const [token, setToken] = useState();
  
  return (
    <AuthContext.Provider 
    // Provide the context data and functions to update them
    value={{
      user, 
      setUser,
      token, 
      setToken
    }}>
      {/* Rendering the children components, which will have access to the context */}
      {props.children}
    </AuthContext.Provider>
  );
  
}

export default AuthContext;