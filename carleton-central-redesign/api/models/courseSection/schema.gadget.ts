import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "courseSection" model, go to https://carleton-central-redesign.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "NP-csF6LuDUE",
  fields: {
    courseToCourseSection: {
      type: "hasOne",
      child: {
        model: "courseToCourseSection",
        belongsToField: "section",
      },
      storageKey: "oCo_0Yj2Jnaq",
    },
    crn: { type: "number", storageKey: "nEMRNnmr36u1" },
    isLabOrTutorial: { type: "boolean", storageKey: "yBFJaudeVWnm" },
    name: { type: "string", storageKey: "DHj_utFn_xIW" },
    professor: { type: "string", storageKey: "YFxRHIHsbca3" },
    timeSlots: { type: "json", storageKey: "xJjTuBiidqFE" },
  },
};
