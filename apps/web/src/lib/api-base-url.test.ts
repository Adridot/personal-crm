import { describe, expect, it } from "vitest";

import { resolveApiBaseUrl } from "./api-base-url";

describe("api-base-url", () => {
  it("returns undefined for missing or blank overrides", () => {
    expect(resolveApiBaseUrl(undefined)).toBeUndefined();
    expect(resolveApiBaseUrl("   ")).toBeUndefined();
  });

  it("trims whitespace and trailing slashes from explicit overrides", () => {
    expect(resolveApiBaseUrl(" http://localhost:3000/ ")).toBe(
      "http://localhost:3000"
    );
    expect(resolveApiBaseUrl("https://api.example.com/custom-auth///")).toBe(
      "https://api.example.com/custom-auth"
    );
  });
});
