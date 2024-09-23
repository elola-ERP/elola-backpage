import { Button, LoginCard } from "@/src/features";
import { login } from "@/src/store/authSlice";
import { AppDispatch } from "@/src/store/store";
// import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        // Simulate a login API request
        const fakeToken = 'fake-jwt-token'; // Replace this with actual API response

        // Store the token in localStorage
        localStorage.setItem('authToken', fakeToken);

        // Dispatch the login action to Redux
        dispatch(login({ token: fakeToken }));

        // Redirect to the dashboard
        router.push('/dashboard');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    
    //     const success = await dispatch(loginUser(email, password));
    //     if (success) {
    //         router.push('/');
    //     } else {
    //         console.error('Login failed');
    //     }
    // };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#2E3248] to-purple-2">

            <div className="flex flex-col rounded-lg h-full w-[500px] justify-center items-center">
                <div className="h-full flex items-center">
                    <Image
                        height="100"
                        width="300"                            
                        src="/elola.png"
                        alt="Salemate Logo"
                    />
                </div>
                <div className="h-full w-full">
                    <form 
                        className="w-full text-start mb-6 mx-1" 
                        onSubmit={handleLogin}
                    >
                        <LoginCard>
                            <label className="text-white/50 text-2xl font-light p-2">EMAIL</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Write your email here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-xl p-2 mt-2 w-full bg-transparent text-white ring-transparent"
                                required
                            />
                        </LoginCard>
                        <label className="text-2xl pb-2">Password</label>
                        <div className="relative w-full">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                name="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className=" border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="text-gray-4 absolute right-0 p-2">
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div className="flex justify-between w-full gap-2">
                            <Button
                                type="submit"
                                className="text-xl"
                            >
                                Log In
                            </Button>
                        </div>
                        {/* <p>Forget password</p> */}
                    </form>
                    <div className="flex flex-col justify-center items-center mb-2">
                        <span className="mb-2">have POS pin?</span>
                        {/* <Link href="/" className="text-lg w-full"> */}
                            <Button className="bg-green-2 hover:bg-green-1">
                                Log In POS
                            </Button>
                        {/* </Link> */}
                    </div>
                </div>
                <div className="h-full">
                    
                </div>
            </div>

        </div>
    )
}