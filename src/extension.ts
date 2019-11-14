import * as vscode from 'vscode';
import { join, resolve } from 'path';
const ora = require('ora');
import { statSync } from 'fs-extra';
import { copy } from 'fs-jetpack';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.xyGenerator', (uri) => {
		copyFiles('../src/templates/list',uri.path);
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

/**
 * 复制
 * @param sourcePath 临时路径
 * @param destPath 目标路径
 */
async function copyFiles(sourcePath: string, destPath: string): Promise<void> {
	const spinner = ora();
  // 源路径
  const sp = join(__dirname,sourcePath);
  // 目标路径
  let dp;
  // 判断下载的是文件还是目录
  if (statSync(sp).isFile()) {
    const [fileName, dirName] = sourcePath.split('/').reverse();
    dp = resolve(destPath, dirName, fileName);
  } else {
    const dirName = sourcePath.split('/').reverse()[0];
    dp = resolve(destPath, dirName);
  }

  // 复制文件
  await copy(sp, dp, { overwrite: true });

  spinner.succeed('下载完成');
}
