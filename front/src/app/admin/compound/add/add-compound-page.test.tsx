import { render, screen } from "@testing-library/react";
import AddCompoundPage from "./page";

jest.mock("@/actions/compound", () => ({
    createCompound: jest.fn(),
    updateCompound: jest.fn()
}));

jest.mock("@/actions/authentication", () => ({
    verifyAdminAuth: jest.fn()
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({ back: jest.fn() }))
}));

describe("Test AddCompoundPage component", () => {
    it("Should display 'Add compound' title, input for title, unit, back button and submit button", async () => {
        const AddCompound = await (AddCompoundPage() as any);
        render(AddCompound);
        const h1 = screen.getByText("Add compound");
        expect(h1).toBeInTheDocument();
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