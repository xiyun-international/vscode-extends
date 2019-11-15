import { copy } from "fs-extra";
import * as vscode from "vscode";
import { template } from "./getPaths";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.xyGenerator",
    uri => {
      copy(template("list"), `${uri.path}/list`).then(() => {
        vscode.window.showInformationMessage("列表页生成成功!");
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
