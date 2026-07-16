import { describe, expect, it } from "vitest";
import {
  isJobPerPageValue,
  isJobSortValue,
  resolvePerPage,
  resolveSort,
  resolveView,
} from "./results-toolbar-config";

describe("isJobSortValue", () => {
  it("accepts a known sort value", () => {
    expect(isJobSortValue("oldest")).toBe(true);
  });

  it("rejects an unknown sort value", () => {
    expect(isJobSortValue("popularity")).toBe(false);
  });
});

describe("isJobPerPageValue", () => {
  it("accepts a known per-page value", () => {
    expect(isJobPerPageValue(24)).toBe(true);
  });

  it("rejects an unknown per-page value", () => {
    expect(isJobPerPageValue(100)).toBe(false);
  });

  it("rejects NaN", () => {
    expect(isJobPerPageValue(Number.NaN)).toBe(false);
  });
});

describe("resolveSort", () => {
  it("passes through a valid value", () => {
    expect(resolveSort("relevant")).toBe("relevant");
  });

  it("falls back to latest for an invalid value", () => {
    expect(resolveSort("bogus")).toBe("latest");
  });

  it("falls back to latest when undefined", () => {
    expect(resolveSort(undefined)).toBe("latest");
  });
});

describe("resolvePerPage", () => {
  it("passes through a valid value", () => {
    expect(resolvePerPage("24")).toBe(24);
  });

  it("falls back to 12 for an invalid value", () => {
    expect(resolvePerPage("999")).toBe(12);
  });

  it("falls back to 12 when undefined", () => {
    expect(resolvePerPage(undefined)).toBe(12);
  });
});

describe("resolveView", () => {
  it("passes through list", () => {
    expect(resolveView("list")).toBe("list");
  });

  it("falls back to grid for anything else", () => {
    expect(resolveView("bogus")).toBe("grid");
    expect(resolveView(undefined)).toBe("grid");
  });
});
