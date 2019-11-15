import { copy } from "fs-extra";
import * as vscode from "vscode";
import { template } from "./getPaths";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand(
    "extension.generator.list",
    uri => {
      copy(template("list"), `${uri.path}/list`);
    }
  ));

  context.subscriptions.push(vscode.commands.registerCommand(
    "extension.generator.create",
    uri => {
      copy(template("create"), `${uri.path}/create`);
    }
  ));

  context.subscriptions.push(vscode.commands.registerCommand(
    "extension.generator.detail",
    uri => {
      copy(template("detail"), `${uri.path}/detail`);
    }
  ));

}

export function deactivate() {}
