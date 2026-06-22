import { describe, expect, it } from "vitest";
import { isNavLinkActive } from "./nav-utils";

describe("isNavLinkActive", () => {
  it("matches root exactly", () => {
    expect(isNavLinkActive("/", "/")).toBe(true);
  });

  it("does not activate root for sub-paths", () => {
    expect(isNavLinkActive("/about", "/")).toBe(false);
  });

  it("matches exact non-root path", () => {
    expect(isNavLinkActive("/about", "/about")).toBe(true);
  });

  it("matches a nested path via prefix", () => {
    expect(isNavLinkActive("/job-board/123-product-designer", "/job-board")).toBe(true);
  });

  it("does not match a partial segment (no false prefix)", () => {
    expect(isNavLinkActive("/about-us", "/about")).toBe(false);
  });

  it("does not activate the wrong link", () => {
    expect(isNavLinkActive("/opportunities", "/job-board")).toBe(false);
  });
});
