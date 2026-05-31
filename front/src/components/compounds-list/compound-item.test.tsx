import { Compound } from "@/interfaces/compound";
import { render, screen } from "@testing-library/react";
import CompoundItem from "./compound-item";

jest.mock("@/actions/compound", () => ({
    patchActive: jest.fn()
}));

const compound: Compound = {
    id: 1,
    title: "Paracetamol",
    unit: "mg",
    min: 500,
    max: 1000,
    active: true
};

const confirm = (compound: Compound) => {};

describe("Test CompoundItem component", () => {
    it("Should display compound details", () => {
        const tbody = document.createElement("tbody");

        render(<CompoundItem compound={compound} confirm={confirm}/>, {
            container: document.body.appendChild(tbody)
        });

        const title = screen.getByText("Paracetamol");
        expect(title).toBeInTheDocument();
        const unit = screen.getByText("mg");
        expect(unit).toBeInTheDocument();
        const min = screen.getByText("500");
        expect(min).toBeInTheDocument();
        const max = screen.getByText("1000");
        expect(max).toBeInTheDocument();
        const archiveButton = screen.getByRole("button", { name: /archive/i });
        expect(archiveButton).toBeInTheDocument();
    });
});