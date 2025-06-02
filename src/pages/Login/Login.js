import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import backgroundImage from "../../assets/images/Ellipse3.png"; // 상단 중앙에 배치할 이미지
import loginLogo from '../../assets/images/login_logo.svg';
// Styled components
import checked from '../../assets/images/checked.svg'
import axios from "axios";
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: white;
    width:480px;
    
    flex-direction: column;
`;

const LoginWrapper = styled.div`
  width: 100%;
  background-color: #111;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover; /* 이미지가 가득 차도록 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #DDDDDD;
  height:48px;
  font-size: 16px;
  box-sizing: border-box; /* 패딩과 보더를 포함하여 크기를 계산 */
  color: ${(props) => (props.readOnly ? '#777' : '#222')};
  &::-webkit-input-placeholder {
    color: #999; /* Chrome, Safari */
  }
  &::-moz-placeholder {
    color: #999; /* Firefox 19+ */
  }
  &:-ms-input-placeholder {
    color: #999; /* Internet Explorer 10+ */
  }
  &::-ms-input-placeholder {
    color: #999; /* Microsoft Edge */
  }
  &::placeholder {
    color: #999; /* Standard syntax */
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 14px;
  margin-top:12px;
`;

const FindLinks = styled.a`
  color: #222;
  font-size:16px;
  line-height:22px;
  text-decoration: none;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #111;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 40px;
  cursor: pointer;
`;

const LoginTitle = styled.h1`
    font-size:36px;
    margin:0px 0px 40px;
    line-height: 44px;
    letter-spacing : -2%;
`;

const CheckboxWrapper = styled.label`
    display: flex;
    font-weight:700;
    font-size: 16px;
    line-height: 22px;
    cursor: pointer;
    line-height: 24px;
    color: #222;
    align-items: center;
  input[type="checkbox"] {
    appearance: none;
    width: 24px;
    height: 24px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 8px;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: #111; /* 체크되었을 때 배경색 검정 */
      border-color: #111; /* 테두리 색 검정 */
      position: relative;
          border: none; /* 체크된 상태에서는 테두리 제거 */
    background: url(${checked}) no-repeat center center;
    }
  }
`;

// Component
const Login = () => {
    const [USER_ID, setUserID] = useState("");
    const [USER_PW, setUserPW] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
           window.location.href = "/dashboard"; // 대시보드 페이지로 이동
        } catch (error) {
            console.error("로그인 오류:", error);
            setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다."); // 오류 메시지 표시
        }
    };

    return (
        <div>
            <LoginWrapper>
                <Container>
                    <LoginBox>
                        <LoginTitle>
                          LOGIN
                        </LoginTitle>
                        <form onSubmit={handleLogin}>
                            <Input
                                type="text"
                                placeholder="아이디를 입력해 주세요."
                                value={USER_ID}
                                onChange={(e) => setUserID(e.target.value)} // 입력 필드 업데이트
                            />
                            <Input
                                type="password"
                                placeholder="비밀번호를 입력해 주세요."
                                value={USER_PW}
                                onChange={(e) => setUserPW(e.target.value)} // 입력 필드 업데이트
                            />
                            <Options>
                                <CheckboxWrapper>
                                    <input
                                        type="checkbox"
                                    />
                                    아이디 저장
                                </CheckboxWrapper>
                            </Options>
                            <LoginButton type="submit">로그인</LoginButton>
                        </form>
                    </LoginBox>
                </Container>
            </LoginWrapper>
        </div>
    );
};
export default Login;
