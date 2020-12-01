import { notes } from "./notes";
import { Models } from "@rematch/core";

export interface RootModel extends Models<RootModel> {
  notes: typeof notes;
}

export const models: RootModel = { notes: notes };
