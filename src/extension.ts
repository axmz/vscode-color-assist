import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  console.log("Exntesion activated");
  let timeout: NodeJS.Timer | undefined = undefined;

  const color = "rgba(100,200,0,0.3)";
  const textDecoration = vscode.window.createTextEditorDecorationType({
    backgroundColor: color,
    overviewRulerColor: color,
    overviewRulerLane: vscode.OverviewRulerLane.Right
  });

  function changeColor() {
    if (!activeEditor) {
      return;
    }
    const regEx = /\/\/#red/g;
    console.log("regex", regEx);
    const text = activeEditor.document.getText();
    const sections: vscode.DecorationOptions[] = [];
    let prevEndPos;
    let prevStartPos;
    let match;
    while ((match = regEx.exec(text))) {
      console.log("match", match);
      const startPos = activeEditor.document.positionAt(match.index);
      const endPos = activeEditor.document.positionAt(text.length);
      let decoration;
      if (!prevEndPos) {
        decoration = { range: new vscode.Range(startPos, endPos) };
      } else {
        decoration = { range: new vscode.Range(prevEndPos, endPos) };
      }
			prevEndPos = activeEditor.document.positionAt(match.index + match.length);

      sections.push(decoration);
    }
    activeEditor.setDecorations(textDecoration, sections);
  }

  let activeEditor = vscode.window.activeTextEditor;

  function triggerUpdateDecorations() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    timeout = setTimeout(changeColor, 500);
  }

  if (activeEditor) {
    triggerUpdateDecorations();
  }

  vscode.window.onDidChangeActiveTextEditor(
    editor => {
      activeEditor = editor;
      if (editor) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument(
    event => {
      if (activeEditor && event.document === activeEditor.document) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );
}
