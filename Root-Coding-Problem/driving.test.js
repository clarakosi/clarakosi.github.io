const chai = require("chai");
const child = require("child_process").exec;
const { assert } = chai;
chai.use(require("chai-fs"));

describe("Drivers", () => {
  const result =
    "Alex: 42 miles @ 34 mph \nDan: 39 miles @ 47 mph \nBob: 0 miles \n";
  before(done => {
    child(
      "node driving.js input.txt \nnode driving.js input2.txt \nnode driving.js input3.txt", e => {
        if (e instanceof Error) {
          console.error(e);
          throw e;
        }
        done();
      }
    );
  });

  after(done => {
    child(
      "rm input_report.txt \nrm input2_report.txt \nrm input3_report.txt", e => {
        if (e instanceof Error) {
          console.error(e);
          throw e;
        }
        done();
      }
    );
  });

  it("should have input report files", () => {
    assert.isFile("input_report.txt");
    assert.isFile("input2_report.txt");
    assert.isFile("input3_report.txt");
  });

  it("should return a report in the proper format", () => {
    assert.notIsEmptyFile("input_report.txt");
    assert.fileContent("input_report.txt", result);
  });

  it("should omit speed greater than 100mph", () => {
    const result2 = "Dan: 39 miles @ 47 mph \nAlex: 0 miles \nBob: 0 miles \n";
    assert.notIsEmptyFile("input2_report.txt");
    assert.fileContent("input2_report.txt", result2);
  });

  it("should omit speed less than 5mph", () => {
    const result3 =
      "Alex: 42 miles @ 34 mph \nBob: 22 miles @ 66 mph \nDan: 0 miles \n";
    assert.notIsEmptyFile("input3_report.txt");
    assert.fileContent("input3_report.txt", result3);
  });
});
