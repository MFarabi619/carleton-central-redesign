import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://carleton-central-redesign.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "GtsQSVlNba3n",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "nmhW_fvH-2hS",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "vjeFgoqv3l4_",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "py1u77gRtwol",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "sN_SzwJ_jD_O",
    },
    firstName: { type: "string", storageKey: "bb0lfyqABZ_W" },
    googleImageUrl: { type: "url", storageKey: "gZ1ekGX3CyGU" },
    googleProfileId: { type: "string", storageKey: "ik8LFe9FxDFk" },
    lastName: { type: "string", storageKey: "1PMkyrJXpssG" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "P9sG0Hn5dWbw",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "V5d_FDQVnUCu",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "it07fxa2G4KA",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "R7cOFDRmNFpm",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "_GLeaerf1TWJ",
    },
  },
};
