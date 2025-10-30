# MacroScript Language Support

[![Version](https://img.shields.io/badge/version-0.2.1-blue.svg)](https://github.com/lovespite/vscode-macroscript-support)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.82.0+-brightgreen.svg)](https://code.visualstudio.com/)

为 [MacroCreator](https://github.com/lovespite/MacroCreator) 的 `.macroscript` DSL 提供全面的 Visual Studio Code 语言支持，包括语法高亮、智能补全和代码片段。

## 功能特性

### 🎨 语法高亮

- **关键字高亮**: `if`, `else`, `endif`, `while`, `endwhile`, `break`, `exit`, `label`, `goto`, `call`
- **函数高亮**: 鼠标操作、键盘操作、像素检测等所有内置函数
- **常量高亮**: 鼠标按钮（Left, Right, Middle）和所有键盘键值
- **注释支持**: 使用 `//` 进行单行注释
- **字符串支持**: 双引号 `"..."` 和反引号 `` `...` `` 字符串
- **变量高亮**: 支持 `$` 开头的变量名
- **运算符高亮**: `==`, `!=` 等比较运算符

### ✨ 智能补全

#### 控制流补全
- `if ... endif` - 条件语句
- `if ... else ... endif` - 带 else 的条件语句
- `while ... endwhile` - 循环语句
- `label name` - 标签定义
- `goto name` - 跳转语句

#### 鼠标操作补全
- `MouseMove(dx, dy, delayMs)` - 相对移动鼠标
- `MouseMoveTo(x, y, delayMs)` - 移动鼠标到绝对坐标
- `MouseDown(button, delayMs)` - 按下鼠标键
- `MouseUp(button, delayMs)` - 释放鼠标键
- `MouseClick(button, delayMs)` - 单击鼠标键
- `MouseWheel(amount, delayMs)` - 滚动鼠标滚轮

#### 键盘操作补全
- `KeyDown(key1, key2, ..., delayMs)` - 按下按键
- `KeyUp(key1, key2, ..., delayMs)` - 释放按键
- `KeyPress(key1, key2, ..., delayMs)` - 按下并释放按键

#### 其他功能补全
- `Delay(milliseconds)` - 延迟
- `PixelColor(x, y)` - 获取像素颜色
- `RGB(r, g, b, tolerance)` - 定义 RGB 颜色
- `Custom(\`expression\`)` - 自定义表达式
- `Script(content, name)` - 内嵌脚本
- 完整的键盘键值列表（F1-F24, A-Z, NumPad0-9, Control, Shift, Alt 等）

### 🔧 语言配置

- **自动闭合**: 自动闭合括号 `()`, 引号 `""`，反引号 `` ` ``
- **括号匹配**: 高亮显示匹配的括号
- **注释切换**: 使用 `Ctrl+/` 快速切换行注释

## 安装

### 从 VSIX 安装

1. 下载最新的 `.vsix` 文件
2. 在 VS Code 中打开命令面板 (`Ctrl+Shift+P`)
3. 运行 `Extensions: Install from VSIX...`
4. 选择下载的 `.vsix` 文件

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/lovespite/vscode-macroscript-support.git
cd vscode-macroscript-support

# 安装依赖
npm install

# 编译
npm run compile

# 打包（可选）
npm install -g @vscode/vsce
vsce package
```

## 使用示例

### 基本鼠标操作

```macroscript
// 移动鼠标并点击
MouseMoveTo(400, 400, 200)    // 200ms 后移动到 (400, 400)
MouseClick(Left, 100)          // 100ms 后单击左键
```

### 键盘操作

```macroscript
// 按下快捷键 Win+R
KeyPress(LWin, R, 25)          // 25ms 后按下并释放 Win+R
```

### 条件判断

```macroscript
// 检测像素颜色
if (PixelColor(10, 20) == RGB(255, 0, 0, 5))
    MouseClick(Left, 100)
    exit
endif

// 使用自定义表达式
if (Custom(`now().Hour > 9`))
    Delay(1000)
else
    Delay(500)
endif
```

### 循环

```macroscript
// 持续滚动直到颜色改变
while (PixelColor(100, 100) == RGB(255, 255, 255))
    MouseWheel(-100, 10)       // 向上滚动
    
    if (Custom(`now().Hour >= 17`))
        break                  // 跳出循环
    endif
endwhile
```

### 内嵌脚本

```macroscript
Script(`
    // 定义和操作全局变量
    set("MyVar", 0)
    set("MyVar", (int)get("MyVar") + 1)
    println("MyVar is now: " + get("MyVar"))
`, "MyScript")
```

### 标签和跳转

```macroscript
label StartPoint

MouseMove(10, 10, 100)
Delay(500)

goto StartPoint                // 跳转回标签位置
```

## 语法说明

### 注释
```macroscript
// 这是单行注释
```

### 延迟参数
大多数操作支持最后一个参数作为延迟时间（毫秒）：
```macroscript
MouseClick(Left, 100)          // 100ms 后执行
KeyPress(A, 50)                // 50ms 后执行
```

### 像素检测
使用 `PixelColor` 和 `RGB` 进行屏幕像素颜色检测：
```macroscript
// x, y 坐标，r, g, b 颜色值，tolerance 容差（可选）
if (PixelColor(100, 200) == RGB(255, 0, 0, 5))
    // 当 (100, 200) 处的颜色接近红色时执行
endif
```

### 自定义表达式
使用反引号包裹 C# 表达式：
```macroscript
if (Custom(`now().Hour >= 18 && now().Hour < 22`))
    // 在晚上6点到10点之间执行
endif
```

### 鼠标按钮
支持的鼠标按钮值：
- `Left` - 左键
- `Right` - 右键
- `Middle` - 中键

### 键盘键值
支持完整的键盘键值，包括：
- 字母键：`A` - `Z`
- 数字键：`D0` - `D9`
- 功能键：`F1` - `F24`
- 数字键盘：`NumPad0` - `NumPad9`
- 修饰键：`Shift`, `Control`, `Alt`, `LWin`, `RWin`
- 特殊键：`Enter`, `Tab`, `Escape`, `Space`, `Back` 等

完整列表请参考智能补全提示。

## 开发

### 项目结构

```
vscode-macroscript-support/
├── src/
│   └── extension.ts              # 扩展主文件（智能补全逻辑）
├── syntaxes/
│   └── macroscript.tmLanguage.json  # 语法高亮定义
├── language-configuration.json   # 语言配置
├── package.json                  # 扩展清单
├── tsconfig.json                # TypeScript 配置
└── demo.macroscript             # 示例文件
```

### 可用脚本

```bash
npm run compile        # 编译 TypeScript
npm run watch         # 监视模式编译
npm run lint          # 运行 ESLint
npm run pretest       # 编译并运行 lint
```

### 调试

1. 在 VS Code 中打开项目
2. 按 `F5` 启动扩展开发主机
3. 在新窗口中打开或创建 `.macroscript` 文件进行测试

## 版本历史

### 0.2.1 (当前版本)
- ✨ 完整的语法高亮支持
- ✨ 智能补全和代码片段
- ✨ 支持所有鼠标和键盘操作
- ✨ 支持控制流结构（if/else/while）
- ✨ 支持像素检测和自定义表达式
- ✨ 完整的键盘键值补全
- 🔧 自动闭合括号和引号

## 贡献

欢迎提交问题和拉取请求！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个拉取请求

## 许可证

本项目采用 MIT 许可证 - 详见 LICENSE 文件

## 相关链接

- [GitHub 仓库](https://github.com/lovespite/vscode-macroscript-support)
- [问题追踪](https://github.com/lovespite/vscode-macroscript-support/issues)

## 致谢

感谢所有为 MacroCreator 和本扩展做出贡献的开发者！

---

**享受使用 MacroScript！** 🚀
