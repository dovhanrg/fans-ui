import React from "react";


type Props = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const Register = ({onSubmit}: Props) => {
    return (
        <div className="form-wrapper">
            <form onSubmit={onSubmit}>
                <label>Register form</label>
                <input type="text" name="register-name" id="register-name" placeholder="Name"/>
                <input type="text" name="register-password" id="register-password" placeholder="Password"/>
                <input type="email" name="register-email" id="register-email" placeholder="Email"/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
