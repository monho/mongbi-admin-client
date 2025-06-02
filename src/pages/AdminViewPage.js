import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ErrorBoundary } from "../components/ErrorBoundary";

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
    margin-top:0px;
    font-weight:700;
`

const MainAnyArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    margin-top:24px;
`

const AnyCard = styled.div`
    width:391px;
    height:308px;
    border:1px solid #DDD;
    border-radius:12px;
    padding:32px;
    display:flex;
    box-sizing: border-box;
    flex-direction: column;

`

const CartTitle = styled.p`
    margin:0px;

`
const CartTitle2 = styled.p`
    margin-top:20px;
    margin-bottom:4px;

    span{
        color: #FF3D00;
        font-weight:700;
        margin-left:4px;
    }

`

const CardInnerPrice = styled.p`
    color:#222;
    margin-top:8px;
    margin-bottom: 20px;
    font-weight:700;
`


const CardInnerBottomPricetoday = styled.p`
    display:flex;
    color:#222;
    margin-top:0px;
    align-items: center;
    margin-bottom: 0px;
    font-weight:700;

    img
    {
        margin-left:8px;
    }

    `
const CardInnerBottomPrice = styled.p`
display:flex;
color:#666666;
margin-top:0px;
align-items: center;
margin-bottom: 0px;
font-weight:700;

img
{
    margin-left:8px;
}


`
const BorderArea = styled.div`
    border : 1px solid #DDD;
`;

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

const SellRankyArea = styled.div`
    width: 100%;
    display: flex;
    margin-top:40px;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom:60px;
`

const SellRankTop = styled.div`
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #222;

`
const SellRankItemArea = styled.div`
    width: 100%;
    display : flex;
    flex-direction: column;
`

const SellRankItem = styled.div`
    height:116px;
    padding : 29px 24px;
    box-sizing: border-box;
    display : flex;
    flex-direction: row;
    align-items: center;
    border-bottom : 1px solid #DDDDDD;
    justify-content: space-between;
`

const LeftArea = styled.div`
    display:flex;
    align-items: center;

`

const Rank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.rank <= 3 ? "#FF4500" : "#666")};
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin-right: 24px;
`;



const ProductInfoArea = styled.div`
    display:flex;
    align-items: center;
    img{
        width:58px;
        height:58px;
    }
`

const ProductInfo = styled.div`
    display:flex;
    flex-direction: column;
    gap:8px;
    font-weight:700;
    p{

        margin: 0px 0px 0px 16px;
    }
    `

const InfoTopArea = styled.div`
    display:flex;
    align-items: center;
    gap:12px;
    img
    {
        width:18px;
        height:20px;
    }
`

const CountArea = styled.div`
    display:flex;
    flex-direction: column;
    gap:16px;

`

const CountTopTextArea = styled.div`
    display : flex;
    justify-content: flex-end;
`


const CountBottomTextArea = styled.div`
    display : flex;
    flex-direction: row;
    align-items: center;
    font-weight: 700;
    p{
    margin:0px
    }
    span
    {
    color : #FF3D00;
    }

    
`


const CountRightText = styled.div`
    width: auto;
    height: 28px;
    background-color: #FFECE5;
    border-radius: 4px;
    color: #FF3D00;
    display: flex;
    padding: 3px 8px;
    align-items: center;
    position: relative; /* ::after를 위한 relative 설정 */
    margin-left:24px;
    margin-right:8px;
    p {
        margin: 0px;
    }

    &::after {
        content: '';
        position: absolute;
        left: -11px; /* 선의 위치를 조정 */
        top: 7;
        height: 20px;
        width: 1px; /* 선의 두께 */
        background-color: #DDD; /* 회색 */
    }
`;

const CountWarp = styled.div`
    width: auto;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    gap:23px;
    
`;

const CntTitle = styled.p`
    font-weight:400;
    color:#222;
    margin-top:0px;
    margin-bottom:0px;
    margin-right:8px;

`;


const Cnt = styled.p`
    font-weight:700;
    margin:0px;
    color: #FF3D00;
`;

const CntArea = styled.div`
    display:flex;



    
`
const AdminViewPage = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 비활성화 상태
    const [timer, setTimer] = useState(0); // 남은 시간 (초 단위)
    useEffect(() => {
        // 페이지 로드 시 localStorage에서 남은 시간 복원
        const storedTime = localStorage.getItem('refresh_timer');
        const now = Date.now();
        if (storedTime) {
            const remainingTime = Math.max(0, Math.ceil((storedTime - now) / 1000));
            if (remainingTime > 0) {
                setIsButtonDisabled(true);
                setTimer(remainingTime);
                startTimer(remainingTime); // 타이머 시작
            }
        }
    }, []);

    const startTimer = (duration) => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsButtonDisabled(false);
                    localStorage.removeItem('refresh_timer'); // 타이머 종료 시 localStorage에서 제거
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleRefresh = () => {
        const duration = 300; // 5분 = 300초
        setIsButtonDisabled(true);
        setTimer(duration);
        const endTime = Date.now() + duration * 1000; // 만료 시간 계산
        localStorage.setItem('refresh_timer', endTime); // localStorage에 만료 시간 저장
        startTimer(duration);
    };
    return (
        <AdmindWarp>
            <PageHeader>
                <HeaderText className='text-lg'>관리자 페이지</HeaderText>
                {/* <RightArea>
                    <UserCounter />
                    <RestoreBtn
                        className='text-sm'
                        onClick={handleRefresh}
                        disabled={isButtonDisabled}
                        style={{ pointerEvents: isButtonDisabled ? 'none' : 'auto', opacity: isButtonDisabled ? 0.5 : 1 }}
                    >
                        {isButtonDisabled ? `갱신 가능: ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : '갱신하기'}
                        <img
                            src={process.env.PUBLIC_URL + `/assets/icon/resotre.svg`}
                            alt="allow"
                        />
                    </RestoreBtn>
                </RightArea> */}

            </PageHeader>
            <PageMain>
                <TopTextArea>
                    <Text className='text-md'>
                        통계 요약
                    </Text>
                </TopTextArea>
                <MainAnyArea>
                    <AnyCard>
                        <CartTitle className='text-md'>
                            총 다운로드 수
                        </CartTitle>
                        <CardInnerPrice className='text-xxxxl'>
                            18,120<span className='text-md'>회</span>
                        </CardInnerPrice>
                        <BorderArea></BorderArea>
                        <CartTitle2 className='text-md'>
                            오늘 <span className='text-ssm'>NEW</span>
                        </CartTitle2>
                        <CardInnerBottomPricetoday className='text-lg'>
                           1,020<span className='text-md'>회</span>
                            <img
                                src={process.env.PUBLIC_URL + `/assets/icon/rankdown.svg`}
                                alt="allow"
                            />
                        </CardInnerBottomPricetoday>
                        <CartTitle2 className='text-md'>
                            어제 <span className='text-ssm'></span>
                        </CartTitle2>
                        <CardInnerBottomPrice className='text-lg'>
                            2,000<span className='text-md'>회</span>
                        </CardInnerBottomPrice>
                    </AnyCard>
                    <AnyCard>
                        <CartTitle className='text-md'>
                            총 가입자 수
                        </CartTitle>
                        <CardInnerPrice className='text-xxxxl'>
                            42,121<span className='text-md'>명</span>
                        </CardInnerPrice>
                        <BorderArea></BorderArea>
                        <CartTitle2 className='text-md'>
                            오늘 <span className='text-ssm'>NEW</span>
                        </CartTitle2>
                        <CardInnerBottomPricetoday className='text-lg'>
                            1,587<span className='text-md'>명</span>
                            <img
                                src={process.env.PUBLIC_URL + `/assets/icon/rankup.svg`}
                                alt="allow"
                            />
                        </CardInnerBottomPricetoday>
                        <CartTitle2 className='text-md'>
                            어제 <span className='text-ssm'></span>
                        </CartTitle2>
                        <CardInnerBottomPrice className='text-lg'>
                            975<span className='text-md'>명</span>
                        </CardInnerBottomPrice>
                    </AnyCard>
                    <AnyCard>
                        <CartTitle className='text-md'>
                            작성된 총 꿈 개수
                        </CartTitle>
                        <CardInnerPrice className='text-xxxxl'>
                            4,128<span className='text-md'>개</span>
                        </CardInnerPrice>
                        <BorderArea></BorderArea>
                        <CartTitle2 className='text-md'>
                            오늘 <span className='text-ssm'>NEW</span>
                        </CartTitle2>
                        <CardInnerBottomPricetoday className='text-lg'>
                            2,120<span className='text-md'>개</span>
                            <img
                                src={process.env.PUBLIC_URL + `/assets/icon/rankup.svg`}
                                alt="allow"
                            />
                        </CardInnerBottomPricetoday>
                        <CartTitle2 className='text-md'>
                            어제 <span className='text-ssm'></span>
                        </CartTitle2>
                        <CardInnerBottomPrice className='text-lg'>
                            10<span className='text-md'>개</span>
                        </CardInnerBottomPrice>
                    </AnyCard>
                    <AnyCard>
                        <CartTitle className='text-md'>
                            DAU(일일 활성자 지수)
                        </CartTitle>
                        <CardInnerPrice className='text-xxxxl'>
                            1,301,071<span className='text-md'>명</span>
                        </CardInnerPrice>
                        <BorderArea></BorderArea>
                        <CartTitle2 className='text-md'>
                            오늘 <span className='text-ssm'>NEW</span>
                        </CartTitle2>
                        <CardInnerBottomPricetoday className='text-lg'>
                            5,005<span className='text-md'>명</span>
                            <img
                                src={process.env.PUBLIC_URL + `/assets/icon/rankup.svg`}
                                alt="allow"
                            />
                        </CardInnerBottomPricetoday>
                        <CartTitle2 className='text-md'>
                            어제 <span className='text-ssm'></span>
                        </CartTitle2>
                        <CardInnerBottomPrice className='text-lg'>
                            2,212<span className='text-md'>명</span>
                        </CardInnerBottomPrice>
                    </AnyCard>
                </MainAnyArea>
                <Main7DayAnyArea>
                    <Main7DayTop>
                        <Text className='text-md'>
                            최근 7일 요약 통계
                        </Text>
                        <LinkBtn className='text-sm'>
                            통계 전체보기
                            <img
                                src={process.env.PUBLIC_URL + `/assets/icon/left-allow.svg`}
                                alt="allow"
                            />
                        </LinkBtn>
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
                <SellRankyArea>
                    <SellRankTop>
                        <Text className='text-md'>
                            실시간 에러 트래킹
                        </Text>
                        <LinkBtn className='text-sm'>
                            에러 전체보기
                            <img
                                src={process.env.PUBLIC_URL + `/assets/icon/left-allow.svg`}
                                alt="allow"
                            />
                        </LinkBtn>
                    </SellRankTop>
                    <SellRankItemArea>
                       <ErrorBoundary />
                    </SellRankItemArea>
                </SellRankyArea>
            </PageMain>
        </AdmindWarp>
    );
};

export default AdminViewPage;
