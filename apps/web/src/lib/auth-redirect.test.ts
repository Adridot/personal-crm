import { describe, expect, it } from "vitest";

import {
  DEFAULT_AUTH_REDIRECT_PATH,
  parseAuthRedirectPath,
  resolveAuthRedirectPath,
} from "./auth-redirect";

describe("auth-redirect", () => {
  it("keeps supported redirect targets in the whitelist", () => {
    expect(parseAuthRedirectPath("/dashboard")).toBe("/dashboard");
    expect(parseAuthRedirectPath("/contacts?view=list#top")).toBe("/contacts");
  });

  it("rejects unsupported or unsafe redirect targets", () => {
    expect(parseAuthRedirectPath("/settings")).toBeUndefined();
    expect(parseAuthRedirectPath("//evil.example.com")).toBeUndefined();
    expect(parseAuthRedirectPath("https://evil.example.com")).toBeUndefined();
  });

  it("falls back to the default redirect when input is invalid", () => {
    expect(resolveAuthRedirectPath("/settings")).toBe(
      DEFAULT_AUTH_REDIRECT_PATH
    );
    expect(resolveAuthRedirectPath(undefined)).toBe(DEFAULT_AUTH_REDIRECT_PATH);
  });
});
