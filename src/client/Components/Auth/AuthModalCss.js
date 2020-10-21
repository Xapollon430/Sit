import styled, { keyframes } from "styled-components";

export const CancelIcon = styled.i`
  color: rgb(20, 169, 109);
  position: absolute;
  right: 10px;
  top: 5px;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid rgb(20, 169, 109);
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

export const TabWrap = styled.div`
  width: 100%;
  margin-top: 35px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: white;
`;
export const TabText = styled.h3`
  text-align: center;
  font-weight: 400;
`;

export const Form = styled.form`
  display: grid;
  width: 85%;
  margin: 10px auto 30px auto;
  grid-gap: 5px;
`;

export const Input = styled.input`
  border: 1px solid #cfcfcf;
  outline: 0;
  height: 16px;
  padding: 0.8em 0 10px 0.8em;
`;

export const SubmitButton = styled.button`
  background-color: #28a55f;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 35px;
`;
