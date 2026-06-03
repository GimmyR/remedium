"use client";

import { FormEvent } from "react";
import SignInInput from "./sign-in-input";
import { signIn } from "@/actions/authentication";

export default function SignInForm() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const user = formData.get("username") as string;
        const pwd = formData.get("password") as string;
        
        const credentials = {
            username: user,
            password: pwd
        };

        await signIn(credentials);
    };

    return (
        <form className="pt-4 pt-lg-4" onSubmit={handleSubmit}>
            <SignInInput type="text" icon="person" name="username" placeholder="Username"/>
            <SignInInput type="password" icon="lock" name="password" placeholder="Password"/>
            <button type="submit" className="btn btn-dark rounded-0 col-12 mt-2 mt-lg-2">Submit</button>
        </form>
    );
}