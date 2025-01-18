import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "requiredCourses" model, go to https://carleton-central-redesign.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "AYqyNMq_7w7S",
  fields: {
    required: {
      type: "belongsTo",
      parent: { model: "courseSection" },
      storageKey: "rxMqamuEQC0i",
    },
    section: {
      type: "belongsTo",
      parent: { model: "courseSection" },
      storageKey: "mPd1hfHsyaae",
    },
  },
};
