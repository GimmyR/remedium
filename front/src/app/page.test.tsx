import HomePage from "@/app/page";
import { render, screen, waitFor } from "@testing-library/react";

const compounds = [
    { id: 1, title: "Paracetamol", unit: "mg" },
    { id: 2, title: "Ibuprofen", unit: "mg" },
    { id: 3, title: "Aspirin", unit: "mg" }
];

jest.mock("@/actions/compound", () => ({
    fetchAllCompounds: jest.fn(() => Promise.resolve(compounds))
}));

describe("Test TestForm component", () => {
    it("should display 'Test medication' title", async () => {
        const Home = await (HomePage() as any);
        render(Home);
        const title = screen.getByText("Test medication");
        expect(title).toBeInTheDocument();
    });

    it("Should display input for applicant and reason", async () => {
        const Home = await (HomePage() as any);
        render(Home);
        const inputApplicant = screen.getByLabelText("Applicant");
        expect(inputApplicant).toBeInTheDocument();
        const inputReason = screen.getByLabelText("Reason");
        expect(inputReason).toBeInTheDocument();
        const startTestBtn = screen.getByRole("button", { name: "Start test" });
        expect(startTestBtn).toBeInTheDocument();
    });
});