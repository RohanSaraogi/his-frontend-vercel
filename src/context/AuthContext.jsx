import { createContext, useEffect, useContext, useReducer } from "react";

const initialState = {
  user: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
};

export const authContext = createContext(initialState); // create context object 

// reducer function to return the states user, role and token according to the action type
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };

    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState); // useReducer hook to manage states

  // state is current state managed by reducer, dispatch is function to dispatch actions to update the state,authReducer takes state and action as arguements and return a new state

  // set user, token and role in local storage after any change to state
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
