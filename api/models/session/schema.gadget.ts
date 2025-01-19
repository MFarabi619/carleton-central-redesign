import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "session" model, go to https://redesign-carleton-central.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "KInBQ8HfiPWw",
  fields: {
    description: { type: "string", storageKey: "IN_tXwRCbPbt" },
    name: { type: "string", storageKey: "dgIGhEIGWKAx" },
    preRequisite: { type: "json", storageKey: "vGjIMYcp33ZB" },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "iD6Ra1Llr1YI",
    },
  },
};
