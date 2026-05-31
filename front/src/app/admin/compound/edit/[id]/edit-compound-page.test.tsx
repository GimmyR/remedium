import { render, screen } from "@testing-library/react";
import EditCompoundPage from "./page";
import { Compound } from "@/interfaces/compound";

const compound: Compound = {
    id: 1,
    title: "Paracetamol",
    unit: "mg",
    min: 500,
    max: 1000,
    active: true
};

jest.mock("@/actions/compound", () => ({
    createCompound: jest.fn(),
    updateCompound: jest.fn(),
    fetchUniqueCompound: jest.fn((id: number) => Promise.resolve(compound))
}));

jest.mock("@/actions/authentication", () => ({
    verifyAdminAuth: jest.fn()
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({ back: jest.fn() }))
}));

const props = {
    params: Promise.resolve({ id: 1 })
};

describe("Test EditCompoundPage component", () => {
    it("Should display 'Edit compound' title and inputs with default values", async () => {
        const AddCompound = await (EditCompoundPage(props) as any);
        render(AddCompound);
        const h1 = screen.getByText("Edit compound");
        expect(h1).toBeInTheDocument();

        const titleInput = screen.getByPlaceholderText("e.g. Paracetamol");
        expect(titleInput).toBeInTheDocument();
        expect(titleInput).toHaveValue(compound.title);

        const unitInput = screen.getByPlaceholderText("e.g. mg");
        expect(unitInput).toBeInTheDocument();
        expect(unitInput).toHaveValue(compound.unit);

        const minInput = screen.getByLabelText("Min :");
        expect(minInput).toBeInTheDocument();
        expect(minInput).toHaveValue(compound.min);

        const maxInput = screen.getByLabelText("Max :");
        expect(maxInput).toBeInTheDocument();
        expect(maxInput).toHaveValue(compound.max);
    });
});