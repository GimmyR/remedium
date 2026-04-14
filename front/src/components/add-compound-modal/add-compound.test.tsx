import { render, screen } from "@testing-library/react";
import AddCompound from "./add-compound";
import { Compound } from "@/interfaces/compound";

const props = {
    compound: {
        id: 1,
        title: "Paracetamol",
        unit: "mg"
    },
    addCompound: (compound: Compound) => {}
};

describe("Test AddCompound component", () => {
    it("should display title, unit and add button", () => {
        render(<AddCompound {...props}/>);
        const title = screen.getByText(props.compound.title);
        const unit = screen.getByText(`(${props.compound.unit})`);
        const button = screen.getByRole("button");
        expect(title).toBeDefined();
        expect(unit).toBeDefined();
        expect(button).toHaveTextContent("Add");
    });
});