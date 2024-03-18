import React from "react";

type Props = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const Login = ({onSubmit}: Props) => {
    return (
        <div className="form-wrapper">
            <form id="login-form" onSubmit={onSubmit}>
                <label>Login form</label>
                <input type="text" name="login-name" id="login-name" placeholder="Name"/>
                <input type="text" name="login-password" id="login-password" placeholder="Password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;