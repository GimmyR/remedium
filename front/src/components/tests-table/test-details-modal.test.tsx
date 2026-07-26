import TestDetailsModal from "@/components/tests-table/test-details-modal";
import { CompoundsTest } from "@/interfaces/compound-test";
import { render, screen } from "@testing-library/react";
import { format } from "date-fns";

const test: CompoundsTest = {
    "id": 1,
    "testDate": new Date(2026, 6, 26, 9, 30),
    "applicant": "Dr. Vance",
    "reason": "To alleviate chronic neuropathic pain in diabetic patients.",
    "details": [
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
    ]
};

describe("Test TestDetailsModal", () => {
    it("Should display modal with test informations and compounds test result", () => {
        render(<TestDetailsModal test={test}/>);
        const date = screen.getByText(format(test.testDate, "dd/MM/yyyy HH:mm"));
        expect(date).toBeInTheDocument();
        const applicant = screen.getByText(test.applicant);
        expect(applicant).toBeInTheDocument();
        const reason = screen.getByText(test.reason);
        expect(reason).toBeInTheDocument();

        const compound = screen.getByText(test.details[0].compound.title);
        expect(compound).toBeInTheDocument();
        const unit = screen.getByText(test.details[0].compound.unit ?? "");
        expect(unit).toBeInTheDocument();
        const min = screen.getByText(test.details[0].compound.min ?? 0);
        expect(min).toBeInTheDocument();
        const max = screen.getByText(test.details[0].compound.max ?? 99999);
        expect(max).toBeInTheDocument();
        const amount = screen.getByText(test.details[0].amount.toFixed(2));
        expect(amount).toBeInTheDocument();
        const result = screen.getByText("Bad");
        expect(result).toBeInTheDocument();
    });
});