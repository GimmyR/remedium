import Testing from "@/components/test-medication/testing";
import { render, screen } from "@testing-library/react";

describe("Test Testing", () => {
    it("Should display 'Analyzing medication'", () => {
        render(<Testing status={1}/>);
        const text = screen.getByText("Analyzing medication");
        expect(text).toBeInTheDocument();
    });

    it("Should display 'Testing compounds'", () => {
        render(<Testing status={2}/>);
        const text = screen.getByText("Testing compounds");
        expect(text).toBeInTheDocument();
    });
});