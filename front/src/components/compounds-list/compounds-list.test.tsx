import { Compound } from "@/interfaces/compound";
import CompoundsList from ".";
import { render, screen } from "@testing-library/react";

jest.mock("@/actions/compound", () => ({
    patchActive: jest.fn(),
    removeCompound: jest.fn()
}));

const compounds: Compound[] = [{
    id: 1,
    title: "Paracetamol",
    unit: "mg",
    min: 500,
    max: 1000,
    active: true
}];

describe("Test CompoundsList component", () => {
    it("Should display list of compounds", () => {
        render(<CompoundsList compounds={compounds}/>);
        const title = screen.getByText("Paracetamol");
        expect(title).toBeInTheDocument();
    });
});