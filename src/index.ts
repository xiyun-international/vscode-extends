import * as vscode from "vscode";
import { copyUI, copyConfig } from "./copy";

export function activate(context: vscode.ExtensionContext) {
  const template = "" + vscode.workspace.getConfiguration().get("xy.template");

  copyUI(template, "list", context);
  copyUI(template, "create", context);
  copyUI(template, "detail", context);
  copyUI(template, "edit", context);

  copyConfig("yarnrc", context);
  copyConfig("editorconfig", context);
}

export function deactivate() {}
