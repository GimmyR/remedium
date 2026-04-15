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

    it("should display title and unit of compounds that are not in compoundsToTest", () => {
        render(<AddCompoundModal {...props}/>);
        compounds.forEach(async (compound) => {
            if(props.compoundsToTest.some(comp => comp.id != compound.id)) {
                const title = await screen.findByText(compound.title);
                expect(title).toBeInTheDocument();
                const unit = await screen.findByText(`(${compound.unit})`);
                expect(unit).toBeInTheDocument();
            }
        });
    });

    it("should not display title and unit of compounds that are in compoundsToTest", () => {
        render(<AddCompoundModal {...props}/>);
        compounds.forEach(async (compound) => {
            if(props.compoundsToTest.some(comp => comp.id == compound.id)) {
                const title = await screen.findByText(compound.title);
                expect(title).toBeUndefined();
                const unit = await screen.findByText(`(${compound.unit})`);
                expect(unit).toBeUndefined();
            }
        });
    });
});