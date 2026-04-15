import { render, screen, waitFor } from "@testing-library/react";
import Home from "./page";

global.fetch = jest.fn();

const compounds = [
    { id: 1, title: "Paracetamol", unit: "mg" },
    { id: 2, title: "Ibuprofen", unit: "mg" },
    { id: 3, title: "Aspirin", unit: "mg" }
];

describe("Test TestForm component", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => (compounds)
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should display 'Test compounds' title", async () => {
        render(<Home/>);
        await waitFor(() => {
            const title = screen.getByText("Test compounds");
            expect(title).toBeInTheDocument();
        });
    });

    it("should display add compound button and submit button", async () => {
        render(<Home/>);
        await waitFor(() => {
            const addCompound = screen.getByRole("button", { name: /add compound/i });
            expect(addCompound).toBeInTheDocument();
            const submit = screen.getByRole("button", { name: /submit/i });
            expect(submit).toBeInTheDocument();
        });
    });

    it("AddCompoundModal should display compounds", async () => {
        render(<Home/>);
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