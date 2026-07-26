import TestDetailsTable from "@/components/tests-table/test-details-table";
import { TestDetail } from "@/interfaces/test-detail";
import { render, screen } from "@testing-library/react";

const details: TestDetail[] = [
    {
        id: 1,
        compound: {
            id: 1,
            title: "Paracetamol",
            min: 500,
            max: 1000,
            unit: "mg",
            active: true
        },
        amount: 300
    }
];

describe("Test TestDetailsTable", () => {
    it("Should display test details", () => {
        render(<TestDetailsTable details={details}/>);
        const compound = screen.getByText(details[0].compound.title);
        expect(compound).toBeInTheDocument();
        const unit = screen.getByText(details[0].compound.unit ?? "");
        expect(unit).toBeInTheDocument();
        const min = screen.getByText(details[0].compound.min ?? 0);
        expect(min).toBeInTheDocument();
        const max = screen.getByText(details[0].compound.max ?? 99999);
        expect(max).toBeInTheDocument();
        const amount = screen.getByText(details[0].amount.toFixed(2));
        expect(amount).toBeInTheDocument();
        const result = screen.getByText("Bad");
        expect(result).toBeInTheDocument();
    });
});