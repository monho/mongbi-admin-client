import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SearchForm from '../components/SearchForm';
import UserCounter from '../components/UserCounter';

const AdmindWarp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
`;

const PageHeader = styled.div`
    width:100%;
    padding-right: 35px;
    box-sizing: border-box;
    height:56px;
    display: flex;
    background-color:#fff;
    border-bottom:1px solid #DDD;
    padding:14px 35px 14px 22px;;
    align-items: center;
    justify-content: space-between;
`
const HeaderText = styled.p`
    color:#222;
    font-weight:700;
`

const RightArea = styled.div`
    display:flex;
    gap:24px;
    align-items: center;
`

const RestoreBtn = styled.a`
    display: flex;
    width: auto;
    height: 38px;
    border: 1px solid #DDD;
    border-radius: 4px;
    color: #222;
    padding: 12px 8px;
    box-sizing: border-box;
    align-items: center;
    background-color: #FFF;
    cursor : pointer;
    gap:6px;
    p{
        margin:0px;
        font-weight:400;
    }
`

const PageMain = styled.div`
  width: 1640px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 24px;
  padding-bottom: 50px; /* 하단 여유 공간 추가 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  flex: 1; /* 남은 공간을 차지하도록 설정 */
`;


const TopTextArea = styled.div`
    
    border-bottom:1px solid #222;
`

const Text = styled.p`
    color:#222;
    font-weight:700;
`


const Main7DayAnyArea = styled.div`
    width: 100%;
    display: flex;
    margin-top:40px;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`

const Main7DayTop = styled.div`
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

`

const LinkBtn = styled.div`
    font-weight:400;
    height:22px;
    color : #5E5E5E;
    display:flex;
    cursor : pointer;
`
// 테이블 스타일
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #222;
  font-weight:400

`;
const TableHeader = styled.thead`
  background-color: #F8F8F8;
  border-top: 1px solid #222; /* <thead> 전체에 border-top 적용 */

  th {
    padding: 12px;
    border: 1px solid #ddd;
    font-weight: bold;
    text-align: center;
    border-top:none;
    box-sizing: border-box; /* 셀 크기를 정확히 계산 */
    border-left:none !important;
     &:last-child {
      border-right: none; /* 마지막 셀의 오른쪽 테두리를 제거 */
    }
  }
`;


const TableBody = styled.tbody`
  tr {
    &:nth-child(odd) {
      background-color: #fefefe;
    }

    &:nth-child(even) {
      background-color: #f9f9f9;
    }

    &:hover {
      background-color: #f1f1f1;
    }
  }

  td {
    padding: 12px;
    border-left:none !important;
    border: 1px solid #ddd;
    text-align: center;
     &:last-child {
      border-right: none; /* 마지막 셀의 오른쪽 테두리를 제거 */
    }
  }
`;
const StatisticsView = () => {
    return (
        <AdmindWarp>
            <PageHeader>
                <HeaderText className='text-lg'>통계 전체보기</HeaderText>
                <RightArea>
                    <UserCounter />
                </RightArea>

            </PageHeader>
            <PageMain>
                <TopTextArea>
                  <SearchForm />
                </TopTextArea>
                <Main7DayAnyArea>
                    <Main7DayTop>
                        <Text className='text-md'>
                            최근 7일 요약 통계
                        </Text>
                        
                    </Main7DayTop>
                    <StyledTable>
                        <TableHeader>
                            <tr>
                                <th className='text-sm'>날짜</th>
                                <th className='text-sm'>다운로드 수</th>
                                <th className='text-sm'>총 회원가입 수</th>
                                <th className='text-sm'>총 탈퇴 수</th>
                                <th className='text-sm'>DAU</th>
                                <th className='text-sm'>총 토큰 사용량</th>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            <tr>
                                <td className='text-sm'>2025.06.02</td>
                                <td className='text-sm'>21,200회</td>
                                <td className='text-sm'>120,521명</td>
                                <td className='text-sm'>2,100명</td>
                                <td className='text-sm'>2,142회</td>
                                <td className='text-sm'>109토큰</td>
                            </tr>
                        </TableBody>
                    </StyledTable>
                </Main7DayAnyArea>
            </PageMain>
        </AdmindWarp>
    );
};

export default StatisticsView;
