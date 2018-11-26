describe('createFramesByTagProperty:', ()=> {
  const {createFramesByTagProperty} = require('../src/lib.js');

  it("Frame Tag {from=2, to=5, direction=forward} should return array [2,3,4,5]", ()=> {
    const tagProp = {
      "name": "walk",
      "from": 2,
      "to": 5,
      "direction": "forward"
    };
    expect(createFramesByTagProperty(tagProp)).toEqual([2,3,4,5]);
  });

  it("Frame Tag {from=2, to=5, direction=reverse} should return array [5,4,3,2]", ()=> {
    const tagProp = {
      "name": "walk",
      "from": 2,
      "to": 5,
      "direction": "reverse"
    };
    expect(createFramesByTagProperty(tagProp)).toEqual([5,4,3,2]);
  });

  it("Frame Tag {from=2, to=5, direction=pingpong} should return array [2,3,4,5,4,3,2]", ()=> {
    const tagProp = {
      "name": "walk",
      "from": 2,
      "to": 5,
      "direction": "pingpong"
    };
    expect(createFramesByTagProperty(tagProp)).toEqual([2,3,4,5,4,3,2]);
  });

  it("Border test: Frame Tag {from=2, to=2} should return array [2]", ()=> {
    const tagProp = {
      "name": "walk",
      "from": 2,
      "to": 2,
      "direction": "pingpong"
    };
    expect(createFramesByTagProperty(tagProp)).toEqual([2]);
  });
});