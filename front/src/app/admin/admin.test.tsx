import { Compound } from "@/interfaces/compound";
import { render, screen } from "@testing-library/react";
import AdminHomePage from "./page";

const compounds: Compound[] = [{
    id: 1,
    title: "Paracetamol",
    unit: "mg",
    min: 500,
    max: 1000,
    active: true
}];

jest.mock("@/actions/compound", () => ({
    patchActive: jest.fn(),
    removeCompound: jest.fn(),
    fetchAllCompounds: jest.fn(() => Promise.resolve(compounds))
}));

jest.mock("@/actions/authentication", () => ({
    verifyAdminAuth: jest.fn()
}));

describe("Test AdminHomePage component", () => {
    it("Should display a list of compounds", async () => {
        const Admin = await (AdminHomePage() as any);
        render(Admin);
        const title = screen.getByText("Paracetamol");
        expect(title).toBeInTheDocument();
    });

    it("Should display a 'Add compound' button/link", async () => {
        const Admin = await (AdminHomePage() as any);
        render(Admin);
        const link = screen.getByRole("link", { name: /add compound/i });
        expect(link).toBeInTheDocument();
    });
});