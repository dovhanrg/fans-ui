import React, {useState} from "react";
import Login from "./Login";
import Register from "./Register";
import {Link, MemoryRouter, Route, Routes} from "react-router-dom";
import {addUserRoute, authRoute} from "../constants";


export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [registered, setRegistered] = useState<{
        "id": number,
        "name": string,
        "password": string,
        "email": string,
        "updatedAt": string,
        "createdAt": string
    } | null>(null);
    const [token, setToken] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const login = formData.get('login-name') as string;
        const password = formData.get('login-password') as string;
        fetch(authRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: login,
                password,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.access_token) {
                    setToken(data.access_token);
                    setIsLoggedIn(true);
                    setUserName(login);
                    setError('');
                } else {
                    setError(data.message);
                }
            })
            .catch(error => {
                console.log(error);
                if (error instanceof Error) {
                    setError(error.message)
                }
            });
    }
    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const login = formData.get('register-name') as string;
        const password = formData.get('register-password') as string;
        const email = formData.get('register-email') as string;
        fetch(addUserRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: login,
                password,
                email,
            })

        })
            .then(response => response.json())
            .then(data => {
                if (data && data.name) {
                    setRegistered(data);
                    setError('');
                } else {
                    setError(data.message);
                }
            })
            .catch(error => {
                console.log(error);
                if (error instanceof Error) {
                    setError(error.message);
                }
            });
    }
    return (
        <div className="main">
            {isLoggedIn ? <div className="hello">
                <div>{`Hello ${userName}`}</div>
            </div> : (
                <MemoryRouter initialEntries={['/login']}>
                    <nav>
                        <ul className="nav-list">
                            < li>< Link to='/login'>Login</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/login' element={<Login onSubmit={handleLogin}/>}/>
                        <Route path='/register' element={<Register onSubmit={handleRegister}/>}/>
                    </Routes>
                </MemoryRouter>
            )
            }
            {error && (<label className="error">{error}</label>)}
            {registered && (<label className="registered">
                {`Name: ${registered.name}, ID: ${registered.id}`}
            </label>)}
        </div>
    );
}