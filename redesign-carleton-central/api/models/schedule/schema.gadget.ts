import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "schedule" model, go to https://redesign-carleton-central.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "6s3Ho5egK2dn",
  fields: {
    course: {
      type: "belongsTo",
      parent: { model: "courses" },
      storageKey: "Jo6OY0npe_mN",
    },
    student: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "mDeu7i_CXb6P",
    },
    term: {
      type: "enum",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["Fall 2024", "Winter 2025", "Summer 2025"],
      storageKey: "TOLdiR_4_eYT",
    },
    worksheet: {
      type: "string",
      validations: { unique: { caseSensitive: true } },
      storageKey: "lO23_Qr5Hv9k",
    },
  },
};
