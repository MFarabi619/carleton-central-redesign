import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://redesign-carleton-central.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "AqxYyN-vAX15",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "Wz7TZfJEY12L",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "F4jgZXZix2c9",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "_cxmlMtEyF3E",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "0dE0wIwblrQA",
    },
    firstName: { type: "string", storageKey: "gUkYNHLZza8f" },
    googleImageUrl: { type: "url", storageKey: "0yiELnfxmMeZ" },
    googleProfileId: { type: "string", storageKey: "z1xI_tz7jnK1" },
    lastName: { type: "string", storageKey: "vWeRfxFC4kWU" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "C3UjW0WzNas3",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "lYHdzWpDw65-",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "aoKOVLPH9ajP",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "QyXJaYNBwmnt",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "fs64OOkkm_Y3",
    },
  },
};
