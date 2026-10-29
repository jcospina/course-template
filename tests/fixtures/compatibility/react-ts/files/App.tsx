import { camelCase } from "lodash-es";
import { message } from "./message.js";
console.log(camelCase(message));
import { useState } from "react";
export default function App() { const [n, setN] = useState(0); return <button onClick={() => setN(n + 1)}>Count: {n}</button>; }
