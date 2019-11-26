import { join } from "path";
import * as vscode from "vscode";
const fs = require('fs');
const path = require('path');

function isPath(filePath: string): any {
  fs.stat(filePath, (err: any, stats: any) => {
    if(err){
        console.log('请创建 template 模板')
        return false;
    } 
    return true;
  })

}

// let workspaceFolders = vscode.workspace.workspaceFolders.map(item => item.uri.path);
let workspaceFolders = vscode.workspace.rootPath;
const filePath = path.resolve(workspaceFolders, './template')
export function template(path: string) {
  // if(isPath(filePath)) {
    return join(filePath, path);
  // }
  
}
