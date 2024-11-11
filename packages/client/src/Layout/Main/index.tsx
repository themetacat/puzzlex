import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Header from '@/Layout/Header';

import $style from './index.module.scss';

const Main = () => {
    return (
        <div className={$style.page}>
            <Header />
            <Outlet />
        </div>
    )
};

export default Main;