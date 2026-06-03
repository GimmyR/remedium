import { render, screen, waitFor } from "@testing-library/react";
import TestForm from ".";

const compounds = [
    { id: 1, title: "Paracetamol", unit: "mg" },
    { id: 2, title: "Ibuprofen", unit: "mg" },
    { id: 3, title: "Aspirin", unit: "mg" }
];

jest.mock("@/actions/compounds-test", () => ({
    makeTests: jest.fn()
}));

jest.mock("@/actions/compound", () => ({
    fetchAllCompounds: jest.fn(() => Promise.resolve(compounds))
}));

describe("Test TestForm component", () => {
    it("should display add compound button and submit button", async () => {
        render(<TestForm/>);
        await waitFor(() => {
            const addCompound = screen.getByRole("button", { name: /add compound/i });
            expect(addCompound).toBeInTheDocument();
            const submit = screen.getByRole("button", { name: /submit/i });
            expect(submit).toBeInTheDocument();
        });
    });

    it("AddCompoundModal should display compounds", async () => {
        render(<TestForm/>);
        await waitFor(() => {
            compounds.forEach(async compound => {
                const title = await screen.findByText(compound.title);
                expect(title).toBeInTheDocument();
                const unit = await screen.findByText(`(${compound.unit})`);
                expect(unit).toBeInTheDocument();
                const button = screen.getByRole("button", { name: /add/i });
                expect(button).toHaveTextContent("Add");
            });
        });
    });
});