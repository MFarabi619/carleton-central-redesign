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
      storageKey: "1hJmZZ1EmhyG",
    },
    worksheet: {
      type: "belongsTo",
      parent: { model: "worksheet" },
      storageKey: "w9vMWQQWkmvM",
    },
  },
};
