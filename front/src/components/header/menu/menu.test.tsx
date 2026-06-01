import { render, screen } from "@testing-library/react";
import Menu from ".";

describe("Test Menu component", () => {
    it("Should display Home and Tests navigation links", () => {
        render(<Menu/>);
        const homeLink = screen.getByRole("link", {name: /home/i});
        expect(homeLink).toBeInTheDocument();
        const testsLink = screen.getByRole("link", {name: /tests/i});
        expect(testsLink).toBeInTheDocument();
    });
});