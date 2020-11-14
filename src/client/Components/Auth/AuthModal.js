import React from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { CancelIcon, TabWrap, TabText, AuthWrap } from "./AuthModalCss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsLogInOpen,
  changeIsSignUpOpen,
} from "../../store/actions/AuthModalActions";

const AuthModal = ({ onClose }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeTab = (e) => {
    e.target.innerHTML == "Login"
      ? dispatch(changeIsLogInOpen(true))
      : dispatch(changeIsSignUpOpen(true));
  };

  return (
    <AuthWrap>
      <CancelIcon onClick={onClose} className="fas fa-times fa-2x" />
      <TabWrap onClick={changeTab}>
        <TabText selected={state.modalState.isSignUpOpen}>Sign Up</TabText>
        <TabText selected={state.modalState.isLogInOpen}>Login</TabText>
      </TabWrap>
      {state.modalState.isLogInOpen ? <Login /> : <SignUp />}
    </AuthWrap>
  );
};

export default AuthModal;
