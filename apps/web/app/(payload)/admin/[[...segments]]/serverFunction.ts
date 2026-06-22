"use server";
import { handleServerFunctions } from "@payloadcms/next/layouts";
import config from "@payload-config";
import { importMap } from "../../importMap";

export async function serverFunction(clientArgs: { name: string; args: Record<string, unknown> }) {
  return handleServerFunctions({ ...clientArgs, config, importMap });
}
