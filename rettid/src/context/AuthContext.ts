import { createContext } from "react";
import { User } from "../common/types";

export const AuthContext = createContext<User | null>(null);
