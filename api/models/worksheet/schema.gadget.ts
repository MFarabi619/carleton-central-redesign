import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "worksheet" model, go to https://redesign-carleton-central.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "9Dm7LQmk8asq",
  fields: {
    name: { type: "string", storageKey: "Av0-cxr0O8dF" },
    schedules: {
      type: "hasMany",
      children: { model: "schedule", belongsToField: "worksheet" },
      storageKey: "FMqMi0uSAuSM",
    },
    term: {
      type: "enum",
      default: "Fall 2024",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["Fall 2024", "Winter 2025", "Summer 2025"],
      storageKey: "kx9sHZF5oic6",
    },
    user: { type: "string", storageKey: "OOAbyUqN7hDF" },
  },
};
