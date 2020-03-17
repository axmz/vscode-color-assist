const text = `
beginning of the text

//#red
after
after
//#

//#blue
after blue
after
//#

end text
`;


var escapeRegExp = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
const comment = '//';
const regex = /(\/\/#(\w*))([\s\S]*?)(\/\/#)/gm;
const r = new RegExp(`(${escapeRegExp(comment)}#(\\w*))([\\s\\S]*?)(\\/\\/#)`, 'gm');
let match;

while(match = r.exec(text)) {
  console.log("match", match);
  // console.log("match[0].l", match[0].length);
  // console.log("match.i", match.index);
}
