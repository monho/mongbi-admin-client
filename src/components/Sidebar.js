import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';


const SiderbarArea = styled.aside`
  width: 56px;
  height: 100vh;
  background-color: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
`;

const SidbarMenu = styled.ul`
  height: auto;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const SidbarMenuItem = styled.li`
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? "#fff" : "#111")};
  transition: background-color 0.3s;

  a {
    color: ${(props) => (props.active ? "#111" : "#fff")};
    text-decoration: none;
  }


`;

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState("/");

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const getIconSrc = (menu, baseName) =>
        `${process.env.PUBLIC_URL}/assets/icon/${baseName}${activeMenu === menu ? "_on" : "_off"
        }.svg`;

    return (
        <SiderbarArea>
            <SidbarMenu>
                <Link to='https://naver.com/'>
                    <SidbarMenuItem>
                        <img
                            src={process.env.PUBLIC_URL + `/assets/icon/home_off.svg`} alt="Home"
                        />
                    </SidbarMenuItem>
                </Link>
                <Link to='/dashboard'>
                    <SidbarMenuItem active={activeMenu === "/dashboard"} onClick={() => handleMenuClick("/dashboard")}>
                        <img src={getIconSrc("/dashboard", "dashboard")} alt="Dashboard" />
                    </SidbarMenuItem>
                </Link>
                <Link to='/users'>
                    <SidbarMenuItem active={activeMenu === "/users"} onClick={() => handleMenuClick("/users")}>
                        <img src={getIconSrc("/users", "user")} alt="Users" />
                    </SidbarMenuItem>
                </Link>
                <Link to='/challenge'>
                    <SidbarMenuItem active={activeMenu === "/challenge"} onClick={() => handleMenuClick("/challenge")}>
                        <img src={getIconSrc("/challenge", "challenge")} alt="challenge" />
                    </SidbarMenuItem>
                </Link>
                <Link to='/any'>
                    <SidbarMenuItem active={activeMenu === "/any"} onClick={() => handleMenuClick("/any")}>
                        <img src={getIconSrc("/any", "any")} alt="Any" />
                    </SidbarMenuItem>
                </Link>
                <Link to='/settings'>
                    <SidbarMenuItem active={activeMenu === "/settings"} onClick={() => handleMenuClick("/settings")}>
                        <img src={getIconSrc("/settings", "setting")} alt="Settings" />
                    </SidbarMenuItem>
                </Link>
            </SidbarMenu>
        </SiderbarArea>
    );
};

export default Sidebar;