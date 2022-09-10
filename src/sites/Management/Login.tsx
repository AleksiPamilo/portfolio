import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import FirebaseServices from "../../firebase/firebaseServices";
import { FaHome, FaLock, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../components/context/authContextProvider";

const authInstance = FirebaseServices.getAuthInstance();

const Login: React.FC = () => {
    const { setIsLoggedIn } = useAuthContext();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        signInWithEmailAndPassword(authInstance, email, password)
            .then(() => {
                setEmail("");
                setPassword("");
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                user.getIdTokenResult()
                    .then((idTokenResult) => {
                        setIsLoggedIn(!!idTokenResult.claims.admin);
                    })
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    });

    return (
        <div className="pt-44 md:pt-64 flex flex-col items-center justify-center bg">
            <div className="flex flex-col bg-gray-300 border-2 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-[25rem] max-w-md">
                <div className="font-medium self-center text-xl sm:text-3xl">
                    Login
                </div>

                <div className="mt-8">
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className="flex flex-col mb-5">
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10">
                                    <FaUserAlt className="text-cyan-500" />
                                </div>
                                <input type="email" className="text-black text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-cyan-400" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(String(e.target.value))} />
                            </div>
                        </div>

                        <div className="flex flex-col mb-6">
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <FaLock className="text-cyan-500"></FaLock>
                                </div>

                                <input type="password" className="text-black text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-cyan-400" placeholder="Enter your password" value={password} onChange={(e) => setPassword(String(e.target.value))} />
                            </div>
                        </div>

                        <div className="flex w-full">
                            <Link to="/" className="flex mt-2 mr-4 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-red-500 hover:bg-red-600 rounded-2xl py-2 w-full transition duration-150 ease-in">
                                <span className="mr-2">
                                    <p className="inline">Home</p>
                                </span>
                                <FaHome className="h-6 w-6" />
                            </Link>
                            <button type="submit" value="Submit" className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-cyan-500 hover:bg-cyan-600 rounded-2xl py-2 w-full transition duration-150 ease-in" disabled={loading}>
                                <span className="mr-2">
                                    {loading ? <p className="inline">Logging in...</p> : <p className="inline">Log in</p>}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
