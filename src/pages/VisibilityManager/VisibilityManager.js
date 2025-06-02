import React, { useState } from 'react';
import styled from 'styled-components';
import Banner from './Banner';
const VisibilityManagerWarp = styled.div`
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

const VisibilityManagerContent = styled.div`
    flex: 1; 
`;

const VisibilityManager = () => {
    const [activeMenu, setActiveMenu] = useState(0);

    const handleMenuClick = (menuIndex) => {
        setActiveMenu(menuIndex);
    };

    // 메뉴에 따라 렌더링할 컴포넌트 선택
    const renderContent = () => {
        switch (activeMenu) {
            case 0:
                return <Banner />;
            case 1:
                return <>dd</>;
            default:
                return <>dd</>;
        }
    };

    return (
        <VisibilityManagerWarp>
            <SideMenu>
                <MenuHeader>
                    <MenuHeaderText className="text-md">노출관리</MenuHeaderText>
                </MenuHeader>
                <Menu>
                    {['- 배너관리'].map(
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
            <VisibilityManagerContent>{renderContent()}</VisibilityManagerContent>
        </VisibilityManagerWarp>
    );
};

export default VisibilityManager;
