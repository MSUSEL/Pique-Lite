import { createContext } from "react";
import type { LinePlotContextType } from "./types";

export const LinePlotContext = createContext<LinePlotContextType<any> | null>(
  null
);
