# PWS Lab Python Pack

PWS Lab（福井大学 電力系統研究室）推奨の Python 開発環境を一発セットアップする拡張パックです。

[VS Code 入門講座](https://lutelute.github.io/pre-vscode/) で紹介している必須拡張機能をワンクリックでインストールできます。

## 含まれる拡張機能（12個）

### Python 開発

| 拡張機能 | 説明 |
|----------|------|
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | IntelliSense, Linting, デバッグ, Jupyter 対応 |
| [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) | 高速な型チェック・自動補完 |
| [Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy) | ブレークポイント・ステップ実行 |
| [Ruff](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff) | 超高速 Linter & Formatter |
| [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) | .ipynb をエディタ内で編集・実行 |
| [autoDocstring](https://marketplace.visualstudio.com/items?itemName=njpwerner.autodocstring) | docstring の自動生成 |

### 開発ツール

| 拡張機能 | 説明 |
|----------|------|
| [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) | Git blame・履歴・比較 |
| [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) | リモートサーバーで開発 |
| [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) | エラー・警告をインライン表示 |
| [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) | インデントを色分け表示 |
| [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) | ファイルパスの自動補完 |
| [Japanese Language Pack](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ja) | VS Code の日本語化 |

## インストール

VS Code のマーケットプレイスで「PWS Lab Python Pack」を検索してインストール、または：

```bash
code --install-extension lutelute.pws-lab-python-pack
```

## おすすめの初期設定

拡張パックをインストールしたら、以下の設定も追加すると快適です：

```jsonc
// settings.json (Cmd+Shift+P → "Open User Settings (JSON)")
{
  "files.autoSave": "onFocusChange",
  "editor.formatOnSave": true,
  "editor.fontSize": 14,
  "editor.minimap.enabled": false,
  "editor.bracketPairColorization.enabled": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "python.defaultInterpreterPath": "python3"
}
```

## 関連リンク

- [VS Code 入門プレゼン](https://lutelute.github.io/pre-vscode/)
- [GitHub リポジトリ](https://github.com/lutelute/pre-vscode)
