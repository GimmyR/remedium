import { render, screen } from "@testing-library/react";
import SignInPage from "./page";

describe("Test SignInPage component", () => {
    it("should display 'Sign in' title", () => {
        render(<SignInPage/>);
        const title = screen.getByRole("heading", { name: /sign in/i });
        expect(title).toBeInTheDocument();
    });

    it("should display person icon", () => {
        render(<SignInPage/>);
        const icon = screen.getByRole("icon", { name: `icon-person` });
        expect(icon).toBeInTheDocument();
    });

    it("should display input for username", () => {
        render(<SignInPage/>);
        const input = screen.getByPlaceholderText("Username");
        expect(input).toBeInTheDocument();
    });

    it("should display lock icon", () => {
        render(<SignInPage/>);
        const icon = screen.getByRole("icon", { name: `icon-lock` });
        expect(icon).toBeInTheDocument();
    });

    it("should display input for password", () => {
        render(<SignInPage/>);
        const input = screen.getByPlaceholderText("Password");
        expect(input).toBeInTheDocument();
    });

    it("should display submit button", () => {
        render(<SignInPage/>);
        const button = screen.getByRole("button", { name: /submit/i });
        expect(button).toBeInTheDocument();
    });
});