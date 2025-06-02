import React, { useState } from 'react';
import styled from 'styled-components';

import ChallengeAdmine from './ChallengeAdmine';
import Faq from './Faq';
import Review from './Review';

const ChallengeWarp = styled.div`
    display: flex;
`;

const SideMenu = styled.div`
    width: 180px;
    height: 100vh;
    box-shadow: 4px 0px 12px 0px rgba(0, 0, 0, 0.07);
    display: flex;
    flex-direction: column;
    z-index:99;
    box-sizing: border-box;
    padding: 0px 24px;
`;

const MenuHeader = styled.div``;

const MenuHeaderText = styled.p`
    font-weight: 700;
    margin-bottom: 0px;
    color: #222;
`;

const Menu = styled.ul`
    list-style: none;
    padding: 0px;
`;

const MenuItem = styled.li`
    color: ${(props) => (props.active ? '#222' : '#666')};
    font-weight: ${(props) => (props.active ? '700' : '400')};
    margin-bottom: 16px;
    cursor: pointer;
    transition: color 0.2s, font-weight 0.2s;

    &:hover {
        color: #222;
    }
`;

const ChallengeContent = styled.div`
    flex: 1; 
`;

const Challenge = () => {
    const [activeMenu, setActiveMenu] = useState(0);

    const handleMenuClick = (menuIndex) => {
        setActiveMenu(menuIndex);
    };

    // 메뉴에 따라 렌더링할 컴포넌트 선택
    const renderContent = () => {
        switch (activeMenu) {
            case 0:
                return <ChallengeAdmine />;
            case 1:
                return <Faq />;
            default:
                return <Review />;
        }
    };

    return (
        <ChallengeWarp>
            <SideMenu>
                <MenuHeader>
                    <MenuHeaderText className="text-md">챌린지관리</MenuHeaderText>
                </MenuHeader>
                <Menu>
                    {['- 챌린지 관리'].map(
                        (menu, index) => (
                            <MenuItem
                                key={index}
                                active={activeMenu === index}
                                className="text-sm"
                                onClick={() => handleMenuClick(index)}
                            >
                                {menu}
                            </MenuItem>
                        )
                    )}
                </Menu>
            </SideMenu>
            <ChallengeContent>{renderContent()}</ChallengeContent>
        </ChallengeWarp>
    );
};

export default Challenge;
