import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './dashboard';
import LoginPage from './login';
import { RootState, AppDispatch } from '../store/store'; // Correct path for RootState and AppDispatch
import { checkAuth } from '../store/auth'; // Import checkAuth from auth.tsx

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      await dispatch(checkAuth()); // Wait for auth check to complete
      setLoading(false); // Auth check is done, stop loading
    };
    checkUserAuth();
  }, [dispatch]);

  if (loading) {
    // While loading, you can show a spinner or a blank page
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <LoginPage />}
    </div>
  );
}
