import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { fileURLToPath } from "url";
import path from "path";
import { Users } from "./collections/Users";
import { env } from "./env";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      importMapFile: path.resolve(__dirname, "app/(payload)/importMap.ts"),
    },
  },
  collections: [Users],
  db: postgresAdapter({
    pool: { connectionString: env.DATABASE_URL },
    push: false,
    migrationDir: path.resolve(__dirname, "migrations"),
  }),
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
});
