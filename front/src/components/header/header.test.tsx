import { render, screen } from "@testing-library/react";
import Header from ".";

describe("Test Header component", () => {
    it("should display Remedium", () => {
        render(<Header/>);
        const brand = screen.getByRole("link", { name: /remedium/i });
        expect(brand).toBeInTheDocument();
    });

    it("should display sign in button", () => {
        render(<Header/>);
        const button = screen.getByRole("link", { name: /sign in/i });
        expect(button).toBeInTheDocument();
    });
});