import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchForm from '../../components/SearchForm';

import checked from '../../assets/images/checked.svg'

const ProductAuth = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  width: 100%;
  padding-right: 35px;
  box-sizing: border-box;
  height: 56px;
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #DDD;
  padding: 14px 35px 14px 22px;
  align-items: center;
  justify-content: space-between;
`;

const HeaderText = styled.p`
  color: #222;
  font-weight: 700;
`;

const SelDelBtn = styled.button`
  display: flex;
  width: 99px;
  justify-content: center;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #222;
  background-color: #fff;
  cursor: pointer;
  gap: 6px;
  align-items: center;
`;

const SubHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 16px 24px;
  flex-direction: row;
`;
const SearchArea = styled.div`
    display : flex;
    gap:8px;
`

const LeftSubArea = styled.div`
    display: flex;
    gap:16px;
    flex-direction: column;
`
const SearchBtn = styled.button`
    width:38px;
    height:38px;
    background-color:#F8F8F8;
    color:#222;
    border: 1px solid #DDD;
    cursor:pointer;
    border-radius : 4px;
`
const InputBox = styled.select`
    width: 117px;
    height: 38px;
    padding: 8px 12px;
    border: 1px solid #DDD;
    color: #222;
    box-sizing: border-box;
    border-radius: 4px;
`;

const InputBox2 = styled.input`
    width: 260px;
    height: 38px;
    padding: 8px 12px;
    border: 1px solid #DDD;
    color: #222;
    box-sizing: border-box;
    border-radius: 4px;
`;

const BtnArea = styled.div`
  height: 38px;
  margin-top: auto;
  display: flex;
  gap: 8px;
`;

const PageMain = styled.div`
  width: 1640px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0px 24px;
  padding-bottom: 50px;
  overflow-y: auto;
  flex: 1;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;
  color:#222;
  

  th, td {
    border: 1px solid #ddd;
    box-sizing: border-box;
    height:46px;
  }

  th {
    height:46px;
    font-weight:400;
    background-color: #f8f8f8;
  }
`;


const AuthButton = styled.button`
  width: 65px;
  height: 30px;
  box-sizing: border-box;
  padding: 4px 8px;
  background-color: ${(props) =>
    props.authenticated ? '#777777' : '#111'}; /* 인증(X): 빨간색 */
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  margin-right: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const UserProgramAuth = () => {
  const [authStatus, setAuthStatus] = useState([
    { id: 1, authenticated: false },
  ]);

  const handleAuthAction = (id, action) => {
    const message =
      action === 'auth'
        ? '인증처리를 하시겠습니까?'
        : '인증 해제를 처리하시겠습니까?';

    const isConfirmed = window.confirm(message);

    if (isConfirmed) {
      setAuthStatus((prevState) =>
        prevState.map((item) =>
          item.id === id ? { ...item, authenticated: action === 'auth' } : item
        )
      );
    }
  };
  return (
    <ProductAuth>
      <PageHeader>
        <HeaderText className="text-lg">프로그램 인증 관리</HeaderText>
      </PageHeader>
      <SubHead>
        <LeftSubArea>
          <SearchForm />
          <SearchArea>
            <InputBox>
              <option>전체</option>
              <option>회원아이디</option>
              <option>회원아이피</option>
            </InputBox>
            <InputBox2 type="text" placeholder="검색어를 입력해주세요." />
            <SearchBtn>
              <img
                src={process.env.PUBLIC_URL + '/assets/icon/search.svg'}
                alt="Upload or Selected"
              />
            </SearchBtn>
          </SearchArea>
        </LeftSubArea>
        <BtnArea>{/* 삭제 버튼 영역 */}</BtnArea>
      </SubHead>

      <PageMain>
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>번호</th>
                <th>프로그램</th>
                <th>유저아이디</th>
                <th>접근IP</th>
                <th>접근 하드웨어 번호</th>
                <th>프로그램 인증여부</th>
                <th>접속일시</th>
              </tr>
            </thead>
            <tbody>
              {authStatus.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>빅테이터 키워드 관심사 DB 추출</td>
                  <td>test1</td>
                  <td>127.0.0.1</td>
                  <td>3DK099K2</td>
                  <td>
                    <AuthButton
                      authenticated={item.authenticated}
                      onClick={() => handleAuthAction(item.id, 'auth')}
                    >
                      인증하기
                    </AuthButton>
                    <AuthButton
                      authenticated={!item.authenticated}
                      onClick={() => handleAuthAction(item.id, 'unAuth')}
                    >
                      인증(X)
                    </AuthButton>
                  </td>
                  <td>2024.12.30</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </PageMain>
    </ProductAuth>
  );
};

export default UserProgramAuth;
