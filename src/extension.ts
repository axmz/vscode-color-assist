import * as vscode from "vscode";
import { TextEditorDecorationType } from "vscode";
import { webColors } from "./webcolors";

export function activate(context: vscode.ExtensionContext) {
  let timeout: NodeJS.Timer | undefined = undefined;

  const defaultColor = "rgba(100,200,0,0.2)";

  function colorPicker(colorName: string, colorTable: any) {
    const _rgba = colorTable[colorName][1];
    const rgba = _rgba.replace("1)", "0.1)");
    if (!rgba) {
      return defaultColor;
    }
    return rgba;
  }

  const textDecoration = (color: string) => {
    return vscode.window.createTextEditorDecorationType({
      backgroundColor: colorPicker(color, webColors),
      overviewRulerColor: colorPicker(color, webColors),
      overviewRulerLane: vscode.OverviewRulerLane.Right
    });
  };

  const escapeRegExp = (s: any) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

  const config = vscode.workspace.getConfiguration("color-assist");
  let comment = config.comment ? config.comment : '//'

  let decorations: TextEditorDecorationType[] = [];

  function changeColor() {
    if (!activeEditor) {
      return;
    }
    decorations.forEach(d => d.dispose());
    const regex = new RegExp(
      `(${escapeRegExp(comment)}#(\\w*))([\\s\\S]*?)(${escapeRegExp(comment)}#)`,
      "gm"
    );
    const text = activeEditor.document.getText();
    // const sections: vscode.DecorationOptions[] = [];
    let match;

    while ((match = regex.exec(text))) {
      // debugger;
      const startPos = activeEditor.document.positionAt(match.index);
      const endPos = activeEditor.document.positionAt(
        match.index + match[0].length
      );
      let decoration = { range: new vscode.Range(startPos, endPos) };
      const color = match[2];
      const decorationType = textDecoration(color);
      decorations.push(decorationType);
      activeEditor.setDecorations(decorationType, [decoration]);
    }
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
