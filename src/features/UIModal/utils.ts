import { format, parse } from "date-fns";

export const createDayName = (date: string, schema?: string) => {
  return schema
    ? format(parse(date, schema, new Date()), "LLLL do yyyy")
    : format(new Date(date), "LLLL do yyyy k:mm");
};

//  format( schema ? (parse(date, schema, new Date()), "LLLL do yyyy") : new Date(date), "LLLL do yyyy")
