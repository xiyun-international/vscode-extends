import { copy } from "fs-extra";
import * as vscode from "vscode";
import { template } from "./getPaths";

export function activate(context: vscode.ExtensionContext) {
  addCommand("list", context);
  addCommand("create", context);
  addCommand("detail", context);
}

function addCommand(command: string, context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand(`extension.generator.${command}`, uri => {
    copy(template(`antd/${command}`), `${uri.path}/${command}`);
  }));
}

export function deactivate() {}
