import { ActionOptions, InvalidRecordError } from "gadget-server";
 
export const run: ActionRun = async ({ params, api }) => {
  if (!params.name) {
    throw new InvalidRecordError("Missing required parameter", [
      { apiIdentifier: "name", message: "Worksheet name is required" }
    ]);
  }
  
  if (!params.userId) {
    throw new InvalidRecordError("Missing required parameter", [
      { apiIdentifier: "userId", message: "User ID is required" }
    ]);
  }
 
  const worksheet = await api.worksheet.findFirst({
    filter: {
      AND: [
        { name: { equals: params.name } },
        { user: { equals: params.userId } }
      ]
    }
  });
 
  return worksheet;
};
 
export const options: ActionOptions = {
  actionType: "custom",
  returnType: true
};
 
export const params = {
  name: { type: "string" },
  userId: { type: "string" }
};