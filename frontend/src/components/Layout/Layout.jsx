import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout() {
    return (
        <>
            <Header />
            <main id="main-content" className="main-content">
                <Outlet />
            </main>
            <BottomNav />
        </>
    );
}
