import { render, screen } from "@testing-library/react";
import TestsTable from ".";
import { format } from "date-fns";

const tests = [
    {
        "id": 1,
        "testDate": new Date(),
        "details": [
            {
                "id": 2,
                "compound": {
                    "id": 1,
                    "title": "Paracetamol",
                    "unit": "mg",
                    "min": 500,
                    "max": 1000,
                    "active": true
                },
                "amount": 300
            }
        ]
    }
];

describe("Test TestsTable component", () => {
    it("Should display a list of compounds test", () => {
        render(<TestsTable tests={tests}/>);
        const date = screen.getByText(format(tests[0].testDate, "dd/MM/yyyy"));
        expect(date).toBeInTheDocument();
    });
});