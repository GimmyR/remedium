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
    it("should display title", () => {
        render(<AddCompound {...props}/>);
        const title = screen.getByText(props.compound.title);
        expect(title).toBeDefined();
    });

    it("should display unit in parentheses", () => {
        render(<AddCompound {...props}/>);
        const unit = screen.getByText(`(${props.compound.unit})`);
        expect(unit).toBeDefined();
    });

    it("should display add button", () => {
        render(<AddCompound {...props}/>);
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent("Add");
    });
});