import React from 'react';
import styled from 'styled-components';

const HeaderWarp = styled.div`
    width: auto;
    height: 56px;
    background-color: #111;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 1px solid #FFFFFF30;
    padding-left:0px;
`;

const LogoArea = styled.div`
    width: 180px;
    height: 56px;
    border-right: 1px solid #FFFFFF30;
    box-sizing: border-box; /* border와 padding을 포함한 전체 크기를 유지 */
    padding: 0 20px;
    display: flex; /* flexbox로 설정 */
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: center;
    img{
        width:108px;
    }
`;
const LogoText = styled.p`
    font-size:22px;
    color:#FFF;
`
const Header = () => {
    return (
        <HeaderWarp className="header">
            <LogoArea>
                <div className="logo">
                    <LogoText>MONGBI</LogoText>
                </div>
            </LogoArea>
        </HeaderWarp>
    );
};

export default Header;
