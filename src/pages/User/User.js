import React, { useState } from 'react';
import styled from 'styled-components';

import UserList from './UserList';
import UserTerms from './UserTerms';

const UserWarp = styled.div`
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

const UserContent = styled.div`
    flex: 1; 
`;

const User = () => {
    const [activeMenu, setActiveMenu] = useState(0);

    const handleMenuClick = (menuIndex) => {
        setActiveMenu(menuIndex);
    };

    // 메뉴에 따라 렌더링할 컴포넌트 선택
    const renderContent = () => {
        switch (activeMenu) {
            case 0:
                return <UserList />;
            case 1:
                return <UserTerms />;
            default:
                return <div>페이지를 선택하세요</div>;
        }
    };

    return (
        <UserWarp>
            <SideMenu>
                <MenuHeader>
                    <MenuHeaderText className="text-md">회원관리</MenuHeaderText>
                </MenuHeader>
                <Menu>
                    {['- 회원목록','- 약관관리'].map(
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
            <UserContent>{renderContent()}</UserContent>
        </UserWarp>
    );
};

export default User;
