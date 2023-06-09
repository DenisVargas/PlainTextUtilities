// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "PTUtils" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	let disposable = vscode.commands.registerCommand('TextUtils.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from PlainTextUtils!');
// 	});

// 	context.subscriptions.push(disposable);
// }

export function activate(context: vscode.ExtensionContext) {
	console.log('Extention "TextUtils" is now active!');

    let disposable = vscode.commands.registerCommand('TextUtils.WrapLine', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selections = editor.selections;

            editor.edit((editBuilder) => {
                selections.forEach((selection) => {
                    const text = document.getText(selection);
                    const wrappedText = wrapText(text);
                    editBuilder.replace(selection, wrappedText);
                });
            });
        }
    });

    context.subscriptions.push(disposable);
}

function wrapText(text: string, lineWidth: number = 80): string {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    words.forEach((word) => {
        if ((line + ' ' + word).length > lineWidth) {
            lines.push(line);
            line = word;
        } else {
            line += (line.length > 0 ? ' ' : '') + word;
        }
    });

    lines.push(line);

    return lines.join('\n');
}

// This method is called when your extension is deactivated
export function deactivate() {}
