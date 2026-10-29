import React from "react";
import {camelCase} from "lodash-es";
import {prefix} from "./prefix";
export const greeting=(name:string)=>camelCase(prefix + name);
export default function App(){return <h1>{greeting("Ada")}</h1>;}
