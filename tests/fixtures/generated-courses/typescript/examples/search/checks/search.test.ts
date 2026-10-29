import {search} from "../index";
test("first and last",()=>{expect(search([2,4,6],2)).toBe(0);expect(search([2,4,6],6)).toBe(2);});
test("empty and missing gap",()=>{expect(search([],3)).toBe(-1);expect(search([2,4,6],3)).toBe(-1);});
