import { notes } from "./notes";
import { Models } from "@rematch/core";
import { tags } from "./tags";

export interface RootModel extends Models<RootModel> {
  notes: typeof notes;
  tags: typeof tags;
}

export const models: RootModel = { notes: notes, tags: tags };
