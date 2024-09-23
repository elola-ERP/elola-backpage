import DashboardHome from '@/src/features/dashboard/dashboard-home';
import Layout from '@/src/features/dashboard/Layout';
import { RootState } from '@/src/store/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
    const router = useRouter();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
        router.push('/login'); // Redirect to login if not authenticated
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) return null;

    return (
        <Layout>
            <DashboardHome />
        </Layout>
    );
}
