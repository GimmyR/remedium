import { render, screen } from "@testing-library/react";
import AddCompoundForm from ".";

jest.mock("@/actions/compound", () => ({
    createCompound: jest.fn(),
    updateCompound: jest.fn()
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({ back: jest.fn() }))
}));

describe("Test AddCompoundForm component", () => {
    it("Should display input for title, unit, back button and submit button", () => {
        render(<AddCompoundForm/>);
        const titleInput = screen.getByPlaceholderText("e.g. Paracetamol");
        expect(titleInput).toBeInTheDocument();
        const titleLabel = screen.getByText("Title :");
        expect(titleLabel).toBeInTheDocument();
        const unitInput = screen.getByPlaceholderText("e.g. mg");
        expect(unitInput).toBeInTheDocument();
        const unitLabel = screen.getByText("Unit :");
        expect(unitLabel).toBeInTheDocument();
        const backBtn = screen.getByRole("button", {name: /back/i});
        expect(backBtn).toBeInTheDocument();
        const submitBtn = screen.getByRole("button", {name: /submit/i});
        expect(submitBtn).toBeInTheDocument();
    });
});