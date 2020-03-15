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

const regex = /(\/\/#(\w*))([\s\S]*?)(\/\/#)/gm;
let match;

while(match = regex.exec(text)) {
  console.log("match", match);
  console.log("match[0].l", match[0].length);
  console.log("match.i", match.index);
}
