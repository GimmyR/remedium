describe("System verification", () => {
    it("should access JWT secret", () => {
        expect(process.env.JWT_SECRET).toBe("loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempx");
    });
});