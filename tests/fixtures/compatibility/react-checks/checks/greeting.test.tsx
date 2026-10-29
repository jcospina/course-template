import React from "react";
import App,{greeting} from "../App";
test("component uses the result",()=>{expect(React.isValidElement(App())).toBe(true);expect(App().props.children).toBe("helloAda");});
test("another name resolves helpers and npm",()=>expect(greeting("Lin")).toBe("helloLin"));
