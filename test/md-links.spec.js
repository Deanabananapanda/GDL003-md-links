const mdLinks = require("../");


describe("mdLinks", () => {

  it("should return true for a valid .md file", () => {  
    expect(mdLinks("../README.md")).toBe(true);
    console.log('FIX ME!');
  });

  it ("should return false for a invalid .md file", () => { 
   expect(mdLinks("../index.js")).toBe(false);
   console.log('FIX ME!');
  });

}); 