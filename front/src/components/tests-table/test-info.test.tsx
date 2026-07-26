import TestInfo from "@/components/tests-table/test-info";
import { CompoundsTest } from "@/interfaces/compound-test";
import { render, screen } from "@testing-library/react";
import { format } from "date-fns";

const test: CompoundsTest = {
    "id": 1,
    "testDate": new Date(2026, 6, 26, 9, 30),
    "applicant": "Dr. Vance",
    "reason": "To alleviate chronic neuropathic pain in diabetic patients.",
    "details": []
};

describe("Test TestInfo", () => {
    it("Should display test informations", () => {
        render(<TestInfo test={test}/>);
        const date = screen.getByText(format(test.testDate, "dd/MM/yyyy HH:mm"));
        expect(date).toBeInTheDocument();
        const reason = screen.getByText(test.reason);
        expect(reason).toBeInTheDocument();
    });
});