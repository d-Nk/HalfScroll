// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable_u = vscode.commands.registerCommand('extension.halfUp', () => {
		if(!SetNewActive(true))
		{	
			return;
		}
	});

	let disposable_d = vscode.commands.registerCommand('extension.halfDown', () => {
		if(!SetNewActive(false))
		{	
			return;
		}
	});

	context.subscriptions.push(disposable_u);
	context.subscriptions.push(disposable_d);
}

function SetNewActive(top : boolean) : boolean
{
	const editor = vscode.window.activeTextEditor;
	if(!editor){return false;}
	const nowSelection = editor.selection;
	if(nowSelection === null){return false;}
	const nowLine = nowSelection.active.line;

	const range = editor.visibleRanges;
	const nowRange = range[0].end.line - range[0].start.line;
	const halfRange = Math.round(nowRange / 2);

	let newLine = top? nowLine - halfRange : nowLine + halfRange;
	if(newLine <= 0)
	{
		newLine = 0;
	}
	const newSelectPos = new vscode.Position(newLine, 0);

	editor.selection = new vscode.Selection(newSelectPos, newSelectPos);
	editor.revealRange(new vscode.Range(newSelectPos, newSelectPos), 
		vscode.TextEditorRevealType.InCenter);
	return true;
}

// this method is called when your extension is deactivated
export function deactivate() {}
