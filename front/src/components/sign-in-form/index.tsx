"use client";

import { FormEvent } from "react";
import SignInInput from "./sign-in-input";
import { API_URL } from "@/lib/urls";
import { saveAccessToken } from "@/app/actions";

export default function SignInForm() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const credentials = {
            username: formData.get("username"),
            password: formData.get("password")
        };

        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await res.json();

        if(res.status == 201)
            await saveAccessToken(data.access_token);

        else console.log(`ERROR (${res.status}) :`, data);
    };

    return (
        <form className="pt-4 pt-lg-4" onSubmit={handleSubmit}>
            <SignInInput type="text" icon="person" name="username" placeholder="johndoe"/>
            <SignInInput type="password" icon="lock" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"/>
            <button type="submit" className="btn btn-dark rounded-0 col-12 mt-2 mt-lg-2">Submit</button>
        </form>
    );
}