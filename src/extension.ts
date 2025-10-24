import * as vscode from 'vscode';

// 关键字
const keywords = ['if', 'else', 'endif', 'while', 'endwhile', 'break', 'Label', 'Goto'];
// 函数
const functions = ['Delay', 'Mouse', 'Key', 'PixelColor', 'RGB', 'Custom'];
// 枚举值
const mouseActions = ['LeftDown', 'LeftUp', 'RightDown', 'RightUp', 'MiddleDown', 'MiddleUp', 'Wheel', 'Move'];
const keyActions = ['KeyDown', 'KeyUp'];
const commonKeys = [
    'LControlKey', 'RControlKey', 'LShiftKey', 'RShiftKey', 'LMenu', 'RMenu',
    'Enter', 'Space', 'Tab', 'Back', 'Delete', 'Escape',
    "Home", "End", "PageUp", "PageDown",
    "Left", "Up", "Right", "Down",
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9',
    "NumPad0", "NumPad1", "NumPad2", "NumPad3", "NumPad4", "NumPad5", "NumPad6", "NumPad7", "NumPad8", "NumPad9",
];

export function activate(context: vscode.ExtensionContext) {

    const provider = vscode.languages.registerCompletionItemProvider('macroscript', {

        provideCompletionItems(
            document: vscode.TextDocument,
            position: vscode.Position,
            token: vscode.CancellationToken,
            context: vscode.CompletionContext
        ) {

            // 1. 关键字补全
            const keywordCompletions = keywords.map(kw =>
                new vscode.CompletionItem(kw, vscode.CompletionItemKind.Keyword)
            );

            // 2. 枚举值补全
            const mouseActionCompletions = mouseActions.map(val =>
                new vscode.CompletionItem(val, vscode.CompletionItemKind.EnumMember)
            );
            const keyActionCompletions = keyActions.map(val =>
                new vscode.CompletionItem(val, vscode.CompletionItemKind.EnumMember)
            );
            const commonKeyCompletions = commonKeys.map(val =>
                new vscode.CompletionItem(val, vscode.CompletionItemKind.EnumMember)
            );

            // 3. 函数和代码片段 (Snippets)
            const delaySnippet = new vscode.CompletionItem('Delay(milliseconds)', vscode.CompletionItemKind.Snippet);
            delaySnippet.insertText = new vscode.SnippetString('Delay(${1:1000})');

            const mouseSnippet = new vscode.CompletionItem('Mouse(action, x, y, delay)', vscode.CompletionItemKind.Snippet);
            mouseSnippet.insertText = new vscode.SnippetString('Mouse(${1|LeftDown,LeftUp,RightDown,RightUp,MiddleDown,MiddleUp,Move,Wheel|}, ${2:x}, ${3:y}, ${4:delay})');

            const keySnippet = new vscode.CompletionItem('Key(action, key, delay)', vscode.CompletionItemKind.Snippet);
            keySnippet.insertText = new vscode.SnippetString('Key(${1|KeyDown,KeyUp|}, ${2:LControlKey}, ${3:delay})');

            const pixelColorSnippet = new vscode.CompletionItem('PixelColor(x, y)', vscode.CompletionItemKind.Function);
            pixelColorSnippet.insertText = new vscode.SnippetString('PixelColor(${1:x}, ${2:y})');

            const rgbSnippet = new vscode.CompletionItem('RGB(r, g, b, tolerance)', vscode.CompletionItemKind.Function);
            rgbSnippet.insertText = new vscode.SnippetString('RGB(${1:255}, ${2:0}, ${3:0}, ${4:tolerance})');

            const customSnippet = new vscode.CompletionItem('Custom(`expression`)', vscode.CompletionItemKind.Function);
            customSnippet.insertText = new vscode.SnippetString('Custom(`${1:true}`)');

            const ifSnippet = new vscode.CompletionItem('if ... endif', vscode.CompletionItemKind.Snippet);
            ifSnippet.insertText = new vscode.SnippetString(
                'if (${1:PixelColor(10, 20) == RGB(255, 0, 0, 5)})\n\t${0}\nendif'
            );

            const ifElseSnippet = new vscode.CompletionItem('if ... else ... endif', vscode.CompletionItemKind.Snippet);
            ifElseSnippet.insertText = new vscode.SnippetString(
                'if (${1:PixelColor(10, 20) == RGB(255, 0, 0, 5)})\n\t${2}\nelse\n\t${3}\nendif'
            );

            const whileSnippet = new vscode.CompletionItem('while ... endwhile', vscode.CompletionItemKind.Snippet);
            whileSnippet.insertText = new vscode.SnippetString(
                'while (${1:PixelColor(10, 20) != RGB(255, 255, 255)})\n\t${0}\nendwhile'
            );

            const labelSnippet = new vscode.CompletionItem('Label(name)', vscode.CompletionItemKind.Snippet);
            labelSnippet.insertText = new vscode.SnippetString('Label(${1:MyLabel})');

            const gotoSnippet = new vscode.CompletionItem('Goto(name)', vscode.CompletionItemKind.Snippet);
            gotoSnippet.insertText = new vscode.SnippetString('Goto(${1:MyLabel})');


            // 聚合所有补全项
            return [
                ...keywordCompletions,
                ...mouseActionCompletions,
                ...keyActionCompletions,
                ...commonKeyCompletions,
                delaySnippet,
                mouseSnippet,
                keySnippet,
                pixelColorSnippet,
                rgbSnippet,
                customSnippet,
                ifSnippet,
                ifElseSnippet,
                whileSnippet,
                labelSnippet,
                gotoSnippet
            ];
        }
    });

    context.subscriptions.push(provider);
}

export function deactivate() { }
