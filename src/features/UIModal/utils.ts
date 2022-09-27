import { format, parse } from "date-fns";

export const createDayName = (date: string, schema?: string) => {
  const stringToParse = date.split("/");
  stringToParse[1] = String(+stringToParse[1] + 1);

  return schema
    ? format(parse(stringToParse.join("/"), schema, new Date()), "LLLL do yyyy")
    : format(new Date(date), "LLLL do yyyy k:mm");
};
