import { render, screen } from "@testing-library/react";
import SignInInput from "./sign-in-input";

describe("Test SignInInput component", () => {
    const inputData = {
        type: "text",
        icon: "person",
        name: "username",
        placeholder: "johndoe"
    };

    it("should display icon", () => {
        render(<SignInInput {...inputData}/>);
        const icon = screen.getByRole("icon", { name: `icon-${inputData.icon}` });
        expect(icon).toBeInTheDocument();
    });

    it("should display input field", () => {
        render(<SignInInput {...inputData}/>)
        const input = screen.getByPlaceholderText(inputData.placeholder);
        expect(input).toBeInTheDocument();
    });
});