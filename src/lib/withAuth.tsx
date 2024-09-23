// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';

// export function withAuth(WrappedComponent) {
//     return function AuthComponent(props) {
//         const router = useRouter();
//         const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

//         useEffect(() => {
//         if (!isLoggedIn) {
//             router.push('/login');
//         }
//         }, [isLoggedIn]);

//         if (!isLoggedIn) {
//         return null; // or a loading spinner
//         }

//         return <WrappedComponent {...props} />;
//     };
// }