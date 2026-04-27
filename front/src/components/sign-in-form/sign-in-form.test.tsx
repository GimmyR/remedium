import { render, screen } from "@testing-library/react";
import SignInForm from ".";

describe("Test SignInForm component", () => {
    it("should display person icon", () => {
        render(<SignInForm/>);
        const icon = screen.getByRole("icon", { name: `icon-person` });
        expect(icon).toBeInTheDocument();
    });

    it("should display input for username", () => {
        render(<SignInForm/>);
        const input = screen.getByPlaceholderText("Username");
        expect(input).toBeInTheDocument();
    });

    it("should display lock icon", () => {
        render(<SignInForm/>);
        const icon = screen.getByRole("icon", { name: `icon-lock` });
        expect(icon).toBeInTheDocument();
    });

    it("should display input for password", () => {
        render(<SignInForm/>);
        const input = screen.getByPlaceholderText("Password");
        expect(input).toBeInTheDocument();
    });

    it("should display submit button", () => {
        render(<SignInForm/>);
        const button = screen.getByRole("button", { name: /submit/i });
        expect(button).toBeInTheDocument();
    });
});