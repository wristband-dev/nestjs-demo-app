import { describe, it, beforeEach, vi, expect } from "vitest";
import axios from "axios";
import { apiClient } from "./axios-client";
import { getActivePinia } from "pinia";
import { router } from "../router";
import { nextTick } from "vue";

vi.mock("pinia");
vi.mock("../router", () => ({
  router: { push: vi.fn() }
}));
vi.mock("vue", () => ({
  nextTick: vi.fn(() => Promise.resolve())
}));

describe("apiClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be an axios instance with correct config", () => {
    expect(apiClient.defaults.baseURL).toBe("http://localhost:6001/api/v1");
    expect(apiClient.defaults.headers["Content-Type"]).toBe("application/json");
    expect(apiClient.defaults.headers["Accept"]).toBe("application/json");
    expect(apiClient.defaults.xsrfCookieName).toBe("CSRF-TOKEN");
    expect(apiClient.defaults.xsrfHeaderName).toBe("X-CSRF-TOKEN");
    expect(apiClient.defaults.withCredentials).toBe(true);
  });

  it("should redirect to /login on 401 error", async () => {
    (getActivePinia as unknown as { mockReturnValue: (v: any) => void }).mockReturnValue({});
    const error = { response: { status: 401 } };
    const interceptor = (apiClient?.interceptors.response as any).handlers[0].rejected;
    await expect(interceptor(error)).rejects.toBe(error);
    expect(router.push).toHaveBeenCalledWith("/login");
    expect(nextTick).toHaveBeenCalled();
  });

  it("should redirect to /login on 403 error", async () => {
    (getActivePinia as unknown as { mockReturnValue: (v: any) => void }).mockReturnValue({});
    const error = { response: { status: 403 } };
    const interceptor = (apiClient.interceptors.response as any).handlers[0].rejected;
    await expect(interceptor(error)).rejects.toBe(error);
    expect(router.push).toHaveBeenCalledWith("/login");
    expect(nextTick).toHaveBeenCalled();
  });

  it("should not redirect on other errors", async () => {
    (getActivePinia as unknown as { mockReturnValue: (v: any) => void }).mockReturnValue({});
    const error = { response: { status: 500 } };
    const interceptor = (apiClient.interceptors.response as any).handlers[0].rejected;
    await expect(interceptor(error)).rejects.toBe(error);
    expect(router.push).not.toHaveBeenCalled();
  });

  it("should not call nextTick if Pinia is not active", async () => {
    (getActivePinia as unknown as { mockReturnValue: (v: any) => void }).mockReturnValue(undefined);
    const error = { response: { status: 401 } };
    const interceptor = (apiClient.interceptors.response as any).handlers[0].rejected;
    await expect(interceptor(error)).rejects.toBe(error);
    expect(nextTick).not.toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/login");
  });

  it("should reject error if response is missing", async () => {
    const error = { message: "Network Error" };
    const interceptor = (apiClient.interceptors.response as any).handlers[0].rejected;
    await expect(interceptor(error)).rejects.toBe(error);
    expect(router.push).not.toHaveBeenCalled();
    expect(nextTick).not.toHaveBeenCalled();
  });

  it("should reject error if status is not 401/403", async () => {
    (getActivePinia as unknown as { mockReturnValue: (v: any) => void }).mockReturnValue({});
    const error = { response: { status: 404 } };
    const interceptor = (apiClient.interceptors.response as any).handlers[0].rejected;
    await expect(interceptor(error)).rejects.toBe(error);
    expect(router.push).not.toHaveBeenCalled();
    expect(nextTick).not.toHaveBeenCalled();
  });

  it("should handle error with no response property gracefully", async () => {
    const error = { foo: "bar" };
    const interceptor = (apiClient.interceptors.response as any).handlers[0].rejected;
    await expect(interceptor(error)).rejects.toBe(error);
    expect(router.push).not.toHaveBeenCalled();
    expect(nextTick).not.toHaveBeenCalled();
  });

  it("should call nextTick only if Pinia is active", async () => {
    (getActivePinia as unknown as { mockReturnValue: (v: any) => void }).mockReturnValue({});
    const error = { response: { status: 401 } };
    const interceptor = (apiClient.interceptors.response as any).handlers[0].rejected;
    await interceptor(error).catch(() => {});
    expect(nextTick).toHaveBeenCalled();
    vi.clearAllMocks();
    (getActivePinia as unknown as { mockReturnValue: (v: any) => void }).mockReturnValue(undefined);
    await interceptor(error).catch(() => {});
    expect(nextTick).not.toHaveBeenCalled();
  });
});
