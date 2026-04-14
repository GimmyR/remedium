import { render, screen, waitFor } from "@testing-library/react";
import AddCompoundModal from ".";
import { Compound } from "@/interfaces/compound";

global.fetch = jest.fn();

const props = {
    compoundsToTest: [
        { id: 2, title: "Ibuprofen", unit: "mg" }
    ],
    addCompound: (compound: Compound) => {}
};

const compounds = [
    { id: 1, title: "Paracetamol", unit: "mg" },
    { id: 2, title: "Ibuprofen", unit: "mg" },
    { id: 3, title: "Aspirin", unit: "mg" }
];

describe("Test AddCompoundModal component", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => (compounds)
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should display 'Add compound' title", async () => {
        render(<AddCompoundModal {...props}/>);
        await waitFor(() => {
            const h1 = screen.getByText("Add compound");
            expect(h1).toBeDefined();
        });
    });

    it("should display search input", async () => {
        render(<AddCompoundModal {...props}/>);
        await waitFor(() => {
            const input = screen.getByPlaceholderText("e.g. Paracetamol");
            expect(input).toBeDefined();
        });
    });

    it("should display title and unit of compounds but also add buttons", () => {
        render(<AddCompoundModal {...props}/>);
        compounds.forEach(async (compound) => {
            const title = await screen.findByText(compound.title);
            expect(title).toBeInTheDocument();
            const unit = await screen.findByText(`(${compound.unit})`);
            expect(unit).toBeInTheDocument();
            const button = screen.getByRole("button", { name: /add/i });
            expect(button).toHaveTextContent("Add");
        });
    });
});