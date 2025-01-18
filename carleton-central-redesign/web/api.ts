// Sets up the API client for interacting with your backend. 
// For your API reference, visit: https://docs.gadget.dev/api/carleton-central-redesign
import { Client } from "@gadget-client/carleton-central-redesign";

export const api = new Client({ environment: window.gadgetConfig.environment });
