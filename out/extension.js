"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
// 关键字
const keywords = ['if', 'else', 'endif', 'while', 'endwhile', 'break', 'label', 'goto', 'exit'];
// 函数
const functions = ['Delay', 'MouseDown', 'MouseUp', 'MouseClick', 'KeyDown', 'KeyUp', 'KeyPress', 'PixelColor', 'RGB', 'Custom'];
// 枚举值
const mouseButtons = ['Left', 'Right', 'Middle'];
// const keyActions = ['KeyDown', 'KeyUp'];
const commonKeys = [
    "None", "LButton", "RButton", "Cancel", "MButton", "XButton1", "XButton2", "Back", "Tab", "LineFeed",
    "Clear", "Return", "Enter", "ShiftKey", "ControlKey", "Menu", "Pause", "CapsLock", "Capital", "HangulMode",
    "HanguelMode", "KanaMode", "JunjaMode", "FinalMode", "HanjaMode", "KanjiMode", "Escape", "IMEConvert", "IMENonconvert", "IMEAccept",
    "IMEAceept", "IMEModeChange", "Space", "Prior", "PageUp", "PageDown", "Next", "End", "Home", "Left",
    "Up", "Right", "Down", "Select", "Print", "Execute", "Snapshot", "PrintScreen", "Insert", "Delete",
    "Help", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8",
    "D9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
    "T", "U", "V", "W", "X", "Y", "Z", "LWin", "RWin", "Apps",
    "Sleep", "NumPad0", "NumPad1", "NumPad2", "NumPad3", "NumPad4", "NumPad5", "NumPad6", "NumPad7", "NumPad8",
    "NumPad9", "Multiply", "Add", "Separator", "Subtract", "Decimal", "Divide", "F1", "F2", "F3",
    "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13",
    "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23",
    "F24", "NumLock", "Scroll", "LShiftKey", "RShiftKey", "LControlKey", "RControlKey", "LMenu", "RMenu", "BrowserBack",
    "BrowserForward", "BrowserRefresh", "BrowserStop", "BrowserSearch", "BrowserFavorites", "BrowserHome", "VolumeMute", "VolumeDown", "VolumeUp", "MediaNextTrack",
    "MediaPreviousTrack", "MediaStop", "MediaPlayPause", "LaunchMail", "SelectMedia", "LaunchApplication1", "LaunchApplication2", "Oem1", "OemSemicolon", "Oemplus",
    "Oemcomma", "OemMinus", "OemPeriod", "OemQuestion", "Oem2", "Oem3", "Oemtilde", "OemOpenBrackets", "Oem4", "Oem5",
    "OemPipe", "OemCloseBrackets", "Oem6", "Oem7", "OemQuotes", "Oem8", "OemBackslash", "Oem102", "ProcessKey", "Packet",
    "Attn", "Crsel", "Exsel", "EraseEof", "Play", "Zoom", "NoName", "Pa1", "OemClear", "KeyCode",
    "Shift", "Control", "Alt", "Modifiers",
];
function activate(context) {
    const provider = vscode.languages.registerCompletionItemProvider('macroscript', {
        provideCompletionItems(document, position, token, context) {
            // 1. 关键字补全
            const keywordCompletions = keywords.map(kw => new vscode.CompletionItem(kw, vscode.CompletionItemKind.Keyword));
            // 2. 鼠标按钮补全
            const mouseButtonCompletions = mouseButtons.map(val => new vscode.CompletionItem(val, vscode.CompletionItemKind.EnumMember));
            // 3. 键值补全
            const commonKeyCompletions = commonKeys.map(val => new vscode.CompletionItem(val, vscode.CompletionItemKind.EnumMember));
            // 4. 函数和代码片段 (Snippets)
            const delaySnippet = new vscode.CompletionItem('Delay(milliseconds)', vscode.CompletionItemKind.Snippet);
            delaySnippet.insertText = new vscode.SnippetString('Delay(${1:1000})');
            const pixelColorSnippet = new vscode.CompletionItem('PixelColor(x, y)', vscode.CompletionItemKind.Function);
            pixelColorSnippet.insertText = new vscode.SnippetString('PixelColor(${1:x}, ${2:y})');
            const rgbSnippet = new vscode.CompletionItem('RGB(r, g, b, tolerance)', vscode.CompletionItemKind.Function);
            rgbSnippet.insertText = new vscode.SnippetString('RGB(${1:255}, ${2:0}, ${3:0}, ${4:tolerance})');
            const customSnippet = new vscode.CompletionItem('Custom(`expression`)', vscode.CompletionItemKind.Function);
            customSnippet.insertText = new vscode.SnippetString('Custom(`${1:true}`)');
            const ifSnippet = new vscode.CompletionItem('if ... endif', vscode.CompletionItemKind.Snippet);
            ifSnippet.insertText = new vscode.SnippetString('if (${1:PixelColor(10, 20) == RGB(255, 0, 0, 5)})\n\t${0}\nendif');
            const ifElseSnippet = new vscode.CompletionItem('if ... else ... endif', vscode.CompletionItemKind.Snippet);
            ifElseSnippet.insertText = new vscode.SnippetString('if (${1:PixelColor(10, 20) == RGB(255, 0, 0, 5)})\n\t${2}\nelse\n\t${3}\nendif');
            const whileSnippet = new vscode.CompletionItem('while ... endwhile', vscode.CompletionItemKind.Snippet);
            whileSnippet.insertText = new vscode.SnippetString('while (${1:PixelColor(10, 20) != RGB(255, 255, 255)})\n\t${0}\nendwhile');
            const labelSnippet = new vscode.CompletionItem('label name', vscode.CompletionItemKind.Snippet);
            labelSnippet.insertText = new vscode.SnippetString('label ${1:MyLabel}');
            const gotoSnippet = new vscode.CompletionItem('goto name', vscode.CompletionItemKind.Snippet);
            gotoSnippet.insertText = new vscode.SnippetString('goto ${1:MyLabel}');
            const namedScriptSnippet = new vscode.CompletionItem('Script(content, name)', vscode.CompletionItemKind.Snippet);
            namedScriptSnippet.insertText = new vscode.SnippetString('Script(${1:`\n\n`}, ${2:"MyScript"})');
            const unnamedScriptSnippet = new vscode.CompletionItem('Script(content)', vscode.CompletionItemKind.Snippet);
            unnamedScriptSnippet.insertText = new vscode.SnippetString('Script(${1:`\n\n`})');
            // 鼠标事件函数
            const mouseMoveSnippet = new vscode.CompletionItem('MouseMove(dx, dy, delayMs)', vscode.CompletionItemKind.Function);
            mouseMoveSnippet.insertText = new vscode.SnippetString('MouseMove(${1:dx}, ${2:dy}, ${3:delayMs})');
            const mouseMoveToSnippet = new vscode.CompletionItem('MouseMoveTo(x, y, delayMs)', vscode.CompletionItemKind.Function);
            mouseMoveToSnippet.insertText = new vscode.SnippetString('MouseMoveTo(${1:x}, ${2:y}, ${3:delayMs})');
            const mouseDownSnippet = new vscode.CompletionItem('MouseDown(button, delayMs)', vscode.CompletionItemKind.Function);
            mouseDownSnippet.insertText = new vscode.SnippetString('MouseDown(${1:Left}, ${2:delayMs})');
            const mouseUpSnippet = new vscode.CompletionItem('MouseUp(button, delayMs)', vscode.CompletionItemKind.Function);
            mouseUpSnippet.insertText = new vscode.SnippetString('MouseUp(${1:Left}, ${2:delayMs})');
            const mouseClickSnippet = new vscode.CompletionItem('MouseClick(button, delayMs)', vscode.CompletionItemKind.Function);
            mouseClickSnippet.insertText = new vscode.SnippetString('MouseClick(${1:Left}, ${2:delayMs})');
            const mouseWheelSnippet = new vscode.CompletionItem('MouseWheel(amount, delayMs)', vscode.CompletionItemKind.Function);
            mouseWheelSnippet.insertText = new vscode.SnippetString('MouseWheel(${1:amount}, ${2:delayMs})');
            // 键盘事件函数
            const keyDownSnippet = new vscode.CompletionItem('KeyDown(key1, key2, ..., delayMs)', vscode.CompletionItemKind.Function);
            keyDownSnippet.insertText = new vscode.SnippetString('KeyDown(${1:Key}, ${2:delayMs})');
            const keyUpSnippet = new vscode.CompletionItem('KeyUp(key1, key2, ..., delayMs)', vscode.CompletionItemKind.Function);
            keyUpSnippet.insertText = new vscode.SnippetString('KeyUp(${1:Key}, ${2:delayMs})');
            const keyPressSnippet = new vscode.CompletionItem('KeyPress(key1, key2, ..., delayMs)', vscode.CompletionItemKind.Function);
            keyPressSnippet.insertText = new vscode.SnippetString('KeyPress(${1:Key}, ${2:delayMs})');
            const forStatementSnippet = new vscode.CompletionItem('for ... endfor', vscode.CompletionItemKind.Snippet);
            forStatementSnippet.insertText = new vscode.SnippetString('for ${1:i} = ${2:0} to ${3:10} step ${4:1}\n\t${0}\nendfor');
            // 聚合所有补全项
            return [
                ...keywordCompletions,
                ...mouseButtonCompletions,
                // ...keyActionCompletions,
                ...commonKeyCompletions,
                delaySnippet,
                pixelColorSnippet,
                rgbSnippet,
                customSnippet,
                ifSnippet,
                ifElseSnippet,
                whileSnippet,
                labelSnippet,
                gotoSnippet,
                namedScriptSnippet,
                unnamedScriptSnippet,
                mouseMoveSnippet,
                mouseMoveToSnippet,
                mouseDownSnippet,
                mouseUpSnippet,
                mouseClickSnippet,
                mouseWheelSnippet,
                keyDownSnippet,
                keyUpSnippet,
                keyPressSnippet,
                forStatementSnippet,
            ];
        }
    });
    context.subscriptions.push(provider);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map