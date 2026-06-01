import { render, screen } from "@testing-library/react";
import Header from ".";

jest.mock('@/actions/authentication', () => ({
  signedInAsAdmin: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Test Header component", () => {
    it("should display Remedium", async () => {
        const HeaderComponent = await (Header() as any);
        render(HeaderComponent);
        const brand = screen.getByRole("link", { name: /remedium/i });
        expect(brand).toBeInTheDocument();
    });

    it("Should display Home and Tests navigation links", async () => {
        const HeaderComponent = await (Header() as any);
        render(HeaderComponent);
        const homeLink = screen.getByRole("link", {name: /home/i});
        expect(homeLink).toBeInTheDocument();
        const testsLink = screen.getByRole("link", {name: /tests/i});
        expect(testsLink).toBeInTheDocument();
    });
});