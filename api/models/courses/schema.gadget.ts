import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "courses" model, go to https://redesign-carleton-central.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "OFwZQsMmqDwP",
  fields: {
    courseToCourseSections: {
      type: "hasMany",
      children: {
        model: "courseToCourseSection",
        belongsToField: "course",
      },
      storageKey: "FJDA6NWSJL2Z",
    },
    description: { type: "string", storageKey: "HH_vtmyBqMAe" },
    name: { type: "string", storageKey: "_k5Ub9ujTD2Z" },
    preRequisite: { type: "json", storageKey: "zv_Y_LOUv34h" },
  },
};
