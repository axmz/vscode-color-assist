import * as vscode from "vscode";
import { TextEditorDecorationType } from "vscode";
import { webColors } from "./webcolors";
import { setCommentLineSymbol } from "./setCommentLineSymbol";

export function activate(context: vscode.ExtensionContext) {
  let activeEditor = vscode.window.activeTextEditor;
  let decorations: TextEditorDecorationType[] = [];
  let timeout: NodeJS.Timer | undefined = undefined;

  //#red
  function colorPicker(
    colorName: string,
    colorTable: any,
    opacity: number = 0.1
  ) {
    const defaultColor = "rgba(100,200,0,0.2)";
    const _rgba = colorTable[colorName][1];
    const rgba = _rgba.replace("1)", `${opacity})`);
    if (!rgba) {
      return defaultColor;
    }
    return rgba;
  }
  //#

  //#blue
  const textDecoration = (color: string, config?: any) => {
    const opacity = config.opacity ? config.opacity : 0.1;
    const rulerOptions = config.ruler ? config.ruler : "on";
    if (rulerOptions === "on") {
      return vscode.window.createTextEditorDecorationType({
        backgroundColor: colorPicker(color, webColors, opacity),
        overviewRulerColor: colorPicker(color, webColors, 0.5),
        overviewRulerLane: vscode.OverviewRulerLane.Right
      });
    } else if (rulerOptions === "off") {
      return vscode.window.createTextEditorDecorationType({
        backgroundColor: colorPicker(color, webColors, opacity)
      });
    } else {
      return vscode.window.createTextEditorDecorationType({
        overviewRulerColor: colorPicker(color, webColors, 0.5),
        overviewRulerLane: vscode.OverviewRulerLane.Right
      });
    }
  };
  //#

  //#magenta
  function escapeRegExp(s: any) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  //#

  //#green
  function changeColor() {
    if (!activeEditor) {
      return;
    }

    decorations.forEach(d => d.dispose()); // dispose previous highlights

    const config = vscode.workspace.getConfiguration("color-assist");
    let languageId = activeEditor.document.languageId;
    let commentLineSymbol = setCommentLineSymbol(languageId);
    const regex = new RegExp(
      `(${escapeRegExp(commentLineSymbol)}#(\\w*))([\\s\\S]*?)(${escapeRegExp(
        commentLineSymbol
      )}#)`,
      "gm"
    );
    const text = activeEditor.document.getText();
    let match;

    while ((match = regex.exec(text))) {
      const startPos = activeEditor.document.positionAt(match.index);
      const endPos = activeEditor.document.positionAt(
        match.index + match[0].length
      );
      let decoration = { range: new vscode.Range(startPos, endPos) };
      const color = match[2];
      const decorationType = textDecoration(color, config);
      decorations.push(decorationType);
      activeEditor.setDecorations(decorationType, [decoration]);
    }
  }
  //#

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
