import type { Access, CollectionConfig } from "payload";

const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: isAuthenticated,
    unlock: isAuthenticated,
    update: isAuthenticated,
  },
  fields: [],
};
