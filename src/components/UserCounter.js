import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CountWarp = styled.div`
    width: auto;
    height: 24px;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 23px;
`;

const CntTitle = styled.p`
    font-weight: 400;
    color: #222;
    margin-right: 8px;
`;

const Cnt = styled.p`
    font-weight: 700;
    color: #FF3D00;
`;

const CntArea = styled.div`
    display: flex;
`;

const UserCounter = () => {
    const [totalUsers, setTotalUsers] = useState(0); // 총 인원수를 저장할 상태
    const [secessionUsers, setSecessionUsers] = useState(0); // 탈퇴 유저 수 상태
    const [totalVisitors, setTotalVisitors] = useState(0); // 총 방문자 수 상태

    useEffect(() => {
        // 총 인원 수 가져오기
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('api/users/count'); // 총 인원수 API
                setTotalUsers(response.data); // 총 인원수를 상태에 저장
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        // 탈퇴 유저 수 가져오기
        const fetchSecessionCount = async () => {
            try {
                const response = await axios.get('api/users/secessionCount'); // 탈퇴 유저 수 API
                setSecessionUsers(response.data); // 탈퇴 유저 수 상태에 저장
            } catch (error) {
                console.error('Error fetching secession user count:', error);
            }
        };

        // 총 방문자 수 가져오기
        const fetchVisitorCount = async () => {
            try {
                const response = await axios.get('api/visitors/count'); // 총 방문자 수 API
                setTotalVisitors(response.data); // 총 방문자 수 상태에 저장
            } catch (error) {
                console.error('Error fetching visitor count:', error);
            }
        };

        fetchUserCount();  // 총 인원수 가져오기
        fetchSecessionCount();  // 탈퇴 유저 수 가져오기
        fetchVisitorCount();  // 총 방문자 수 가져오기
    }, []); // 컴포넌트가 마운트될 때 한 번만 호출

    return (
        <CountWarp>
            <CntArea>
                <CntTitle className="text-md">
                    총 인원수
                </CntTitle>
                <Cnt className="text-md">
                    {totalUsers}명
                </Cnt>
            </CntArea>
            <CntArea>
                <CntTitle className="text-md">
                    총 방문자수
                </CntTitle>
                <Cnt className="text-md">
                    {totalVisitors}명
                </Cnt>
            </CntArea>
            <CntArea>
                <CntTitle className="text-md">
                    탈퇴
                </CntTitle>
                <Cnt className="text-md">
                    {secessionUsers}명
                </Cnt>
            </CntArea>
        </CountWarp>
    );
};

export default UserCounter;
