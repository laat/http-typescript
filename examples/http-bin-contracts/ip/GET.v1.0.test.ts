describe("GET v1.0 /ip/", () => {
  it("should match example json to TypeScript definition", () => {
    expect(require("./__fixtures__/GET.v1.0.test.json")).toMatchType(
      "Response",
      require.resolve("./GET.v1.0.ts")
    );
  });
});
