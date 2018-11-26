var getLinearStepArray = function() {
  var args = Array.prototype.slice.call(arguments);
  var arr = [];
  args.forEach(function(current, i) {
    var target = args[i+1];
    if (target == null || current === target) return;

    if (current < target) {
      for (var i = current; i < target; i++) {
        arr.push(i);
      }
    } else {
      for (var i = current; i > target; i--) {
        arr.push(i);
      }
    }
  });

  return arr;
}

module.exports = {
  createFramesByTagProperty: function(tagProp) {
    var frames;
    if (tagProp.direction === "pingpong") {
      frames = getLinearStepArray(tagProp.from, tagProp.to, tagProp.from-1)
    } else if (tagProp.direction === "reverse") {
      frames = getLinearStepArray(tagProp.to, tagProp.from-1);
    } else {
      // forward
      frames = getLinearStepArray(tagProp.from, tagProp.to+1);
    }

    return frames;
  },
};