
import * as vscode from "vscode";
import { copyUI, copyConfig } from './copy';

export function activate(context: vscode.ExtensionContext) {
  copyUI("antd", "list", context);
  copyUI("antd", "create", context);
  copyUI("antd", "detail", context);
  copyConfig("yarnrc", context);
  copyConfig("editorconfig", context);
}

export function deactivate() {}
