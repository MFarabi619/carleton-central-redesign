import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "courseToCourseSection" model, go to https://carleton-central-redesign.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "bG6UyNBYPgsB",
  fields: {
    course: {
      type: "belongsTo",
      parent: { model: "courses" },
      storageKey: "PKS_-UA6cAzt",
    },
    section: {
      type: "belongsTo",
      parent: { model: "courseSection" },
      storageKey: "IYjFAqohXfkV",
    },
  },
};
