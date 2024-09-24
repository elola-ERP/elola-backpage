import TaxPage from '@/src/features/dashboard/Tax';
import Layout from '@/src/features/dashboard/Layout';
import { useEffect } from 'react';
import { RootState } from '@/src/store/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Tax() {
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
            <TaxPage />
        </Layout>
    );
}
