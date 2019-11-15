import * as vscode from "vscode";
import { copy } from "fs-extra";
import { template } from "./getPaths";

const copyUI = (dir: string, biz: string, context: vscode.ExtensionContext) => {
  const command = `extension.generator.template.${dir}.${biz}`;

  context.subscriptions.push(vscode.commands.registerCommand(command, uri => {
    copy(template(`${dir}/${biz}`), `${uri.path}/${biz}`);
  }));
}

const copyConfig = (file: string, context: vscode.ExtensionContext) => {
  const command = `extension.generator.config.${file}`;

  context.subscriptions.push(vscode.commands.registerCommand(command, uri => {
    copy(template(`config/.${file}`), `${uri.path}/.${file}`);
  }));
}

export {
  copyUI,
  copyConfig
}