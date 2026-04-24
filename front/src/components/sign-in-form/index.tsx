"use client";

import { FormEvent } from "react";
import SignInInput from "./sign-in-input";

export default function SignInForm() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(`${formData.get("username")} => ${formData.get("password")}`);
    };

    return (
        <form className="pt-4 pt-lg-4" onSubmit={handleSubmit}>
            <SignInInput type="text" icon="person" name="username" placeholder="johndoe"/>
            <SignInInput type="password" icon="lock" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"/>
            <button type="submit" className="btn btn-dark rounded-0 col-12 mt-2 mt-lg-2">Submit</button>
        </form>
    );
}