import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "courses" model, go to https://carleton-central-redesign.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "iOwMRrVusTiU",
  fields: {
    courseToCourseSections: {
      type: "hasMany",
      children: {
        model: "courseToCourseSection",
        belongsToField: "course",
      },
      storageKey: "PeWd3K7X7yFL",
    },
    description: { type: "string", storageKey: "eQxo2au-CwNc" },
    name: { type: "string", storageKey: "8pzKK7kdcGf9" },
    preRequisite: { type: "json", storageKey: "yAk9K_0CXz1s" },
  },
};
