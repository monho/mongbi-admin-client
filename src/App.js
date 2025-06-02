import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import User from './pages/User/User';
import Statistics from './pages/Statistics/Statistics';
import Challenge  from './pages/Challenge/Challenge';
import VisibilityManager from './pages/VisibilityManager/VisibilityManager';
import Login from './pages/Login/Login';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // 방문자 기록 API 호출
    // const recordVisitor = async () => {
    //   try {
    //     await axios.get('api/visitors/record'); // 실제 API 엔드포인트로 수정
    //   } catch (error) {
    //     console.error('Error recording visitor:', error);
    //   }
    // };

    // recordVisitor(); // 컴포넌트가 마운트될 때 API 호출
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login에는 Layout을 적용하지 않음 */}
          <Route path="/" element={<Login />} />
          {/* 나머지 라우트에는 Layout 적용 */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<User />} />
                  <Route path="/challenge" element={<Challenge />} />
                  {/* <Route path="/any" element={<Statistics />} /> */}
                  <Route path="/show" element={<VisibilityManager />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
