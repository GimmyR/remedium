import TestResult from "@/components/tests-table/test-result";
import { render, screen } from "@testing-library/react";

describe("Test TestResult", () => {
    it("Should display Good", () => {
        render(<TestResult result={true}/>);
        const text = screen.getByText("Good");
        expect(text).toBeInTheDocument();
    });

    it("Should display Bad", () => {
        render(<TestResult result={false}/>);
        const text = screen.getByText("Bad");
        expect(text).toBeInTheDocument();
    });
});