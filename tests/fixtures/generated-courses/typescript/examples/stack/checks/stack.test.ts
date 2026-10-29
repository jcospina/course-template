import {push,pop} from "../index";
test("last in, first out and empty",()=>{push("A");push("B");expect(pop()).toBe("B");expect(pop()).toBe("A");expect(pop()).toBeUndefined();});
