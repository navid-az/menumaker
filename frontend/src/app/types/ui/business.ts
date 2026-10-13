import { Table } from "../api/business";

export type TableUI = Omit<Table, "id" | "is_associated" | "active_call"> & {
  active_call?: Pick<
    NonNullable<Table["active_call"]>,
    "status" | "created_at" | "expires_at"
  >;
};
