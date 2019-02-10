describe("DELETE v1.0 /delay/{delay}", () => {
  it("should match example json to TypeScript definition", () => {
    expect(require("./__fixtures__/DELETE.v1.0.test.json")).toMatchType(
      "Response",
      require.resolve("./DELETE.v1.0.ts")
    );
  });
});
