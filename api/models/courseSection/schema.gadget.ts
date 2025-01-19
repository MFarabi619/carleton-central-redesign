import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "courseSection" model, go to https://redesign-carleton-central.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "H21l58AdWHVm",
  fields: {
    courseToCourseSection: {
      type: "hasOne",
      child: {
        model: "courseToCourseSection",
        belongsToField: "section",
      },
      storageKey: "utJ6F3L1LeI_",
    },
    crn: { type: "number", storageKey: "0z5i3zKj0tqd" },
    isLabOrTutorial: { type: "boolean", storageKey: "zdhfQXDZjF36" },
    name: { type: "string", storageKey: "8RVyyJ4L5Ls9" },
    professor: { type: "string", storageKey: "XOQ9p3iDxzEY" },
    timeSlots: { type: "json", storageKey: "GHZHrK3I24To" },
  },
};
