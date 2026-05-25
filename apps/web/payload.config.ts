import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";
import { env } from "./env";

export default buildConfig({
  admin: { user: "users" },
  collections: [Users],
  db: postgresAdapter({ pool: { connectionString: env.DATABASE_URL } }),
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
});
