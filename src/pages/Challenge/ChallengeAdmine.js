import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchForm from '../../components/SearchForm';

import NoticeWrite from './NoticeWrite';
import checked from '../../assets/images/checked.svg'
const ChallengeAdmineWarp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;

const CheckboxWrapper = styled.label`
    display: flex
;
    cursor: pointer;
    color: #222;
    align-items: center;
    justify-content: center;

    input[type="checkbox"] {
    width: 20px;
    height: 20px;
    appearance: none;
    
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

const WriteBtn = styled.button`
  display: flex;
  width: 123px;
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
const DelBtn = styled.button`
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


const LeftSubArea = styled.div`
    display: flex;
    gap:16px;
    flex-direction: column;
`


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
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    font-weight:400;
    background-color: #f8f8f8;
  }
`;

const ChallengeAdmine = () => {

    const handleBack = (shouldReload) => {
        setIsRegisterMode(false);
        setIsEditMode(false);
        setSelectedProduct(null);
        // if (shouldReload) {
        //     fetchProducts();
        // }
    };
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    return (
        <ChallengeAdmineWarp>
            {isRegisterMode ? (
                <ChallengeAdmineWrite onBack={handleBack} />
            )  : (
                <>
                    <PageHeader>
                        <HeaderText className='text-lg'>챌린지</HeaderText>
                    </PageHeader>
                    <SubHead>
                        <LeftSubArea>
                            <SearchForm />
                        </LeftSubArea>
                        <BtnArea>
                            <DelBtn>
                                선택삭제
                                <img src={process.env.PUBLIC_URL + '/assets/icon/del.svg'}
                                    alt="Upload or Selected"
                                />
                            </DelBtn>
                            <WriteBtn onClick={() => setIsRegisterMode(true)}>
                                챌린지 등록
                                <img src={process.env.PUBLIC_URL + '/assets/icon/write.svg'}
                                    alt="Upload or Selected"
                                />
                            </WriteBtn>
                        </BtnArea>
                    </SubHead>

                    <PageMain>
                        <TableContainer>
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <th style={{ width: '48px' }}>
                                            <CheckboxWrapper>
                                                <input
                                                    type="checkbox"
                                                />
                                            </CheckboxWrapper></th>
                                        <th>번호</th>
                                        <th>게시구분</th>
                                        <th>챌린지 타입</th>
                                        <th>챌린지 분위기 키워드</th>
                                        <th>챌리지 내용</th>
                                        <th>등록일자</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '48px' }}></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </StyledTable>
                        </TableContainer>
                    </PageMain>
                </>
            )}
        </ChallengeAdmineWarp>
    );
};

export default ChallengeAdmine;
