import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import userReducer from "./userReducer";
import { createUser, loginUserApi, getVerifyUser  } from "../API/userServices.js";
import api from "../API/apiClient";

const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const initialState = {
    infoUser: [],
    authStatus: false,
  };

  const [userState, dispatch] = useReducer(userReducer, initialState);

  // Función: loginUser usando userServices
  const loginUser = async (user) => {
    try {
      const userOn = await loginUserApi(user);

      if (userOn?.success) {
        localStorage.setItem("token", userOn.token);

        dispatch({
          type: "REGISTER/LOGIN",
          payload: userOn.token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Función: registerUser usando userServices
  const registerUser = async (user) => {
    try {
      const userOn = await createUser(user);

      if (userOn?.success) {
        localStorage.setItem("token", userOn.token);

        dispatch({
          type: "REGISTER/LOGIN",
          payload: userOn.token,
        });
      }
      console.log(userOn.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Verificar token
  const verifyToken = async () => {
    const token = localStorage.getItem("token");

    if(token){
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common["Authorization"]
    }

    try {
      const infoUserVerify = await getVerifyUser();
      

      dispatch({
        type: "INFO_USER",
        payload: infoUserVerify.info,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Cerrar sesión
  const signOut = () => {
    try {
      // localStorage.removeItem("token");
      dispatch({ type: "SIGN_OUT" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        registerUser,
        verifyToken,
        signOut,
        infoUser: userState.infoUser,
        authStatus: userState.authStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;