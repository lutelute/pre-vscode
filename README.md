# VS Code 入門 — 全15回カリキュラム

> **GitHub Pages**: https://lutelute.github.io/pre-vscode/

`terminal-slide` HTMLフォーマットによるプレゼン資料。VS Code の UI を模したデザインで、実際の操作感を体感しながら学べる。

---

## 全15回 カリキュラム

### 第1回: VS Code とは — エディタの選び方
- VS Code の特徴と他エディタ（Vim, PyCharm, Jupyter）との比較
- インストール方法（macOS / Windows / Linux）
- 初期設定と日本語化

### 第2回: 画面構成編 — UIを理解する
- Activity Bar / Side Bar / Editor / Panel / Status Bar
- ワークスペースとフォルダの概念
- `code` コマンドによるターミナルからの起動

### 第3回: コマンドパレット編 — 全ての操作の入口
- `Cmd+Shift+P` でコマンドパレットを開く
- プレフィックス使い分け（`>`, `@`, `#`, `:`, なし）
- `Cmd+P` によるファイル検索とあいまいマッチ

### 第4回: ショートカット編 — マウスに頼らない操作
- 必須ショートカット12選
- 行操作（移動・複製・削除・コメント切替）
- ファイル操作（開く・閉じる・保存・分割）
- Windows / Linux とのキー対応

### 第5回: マルチカーソル編 — 一括編集の技術
- `Cmd+D` による同一単語の追加選択
- `Alt+Click` / `Cmd+Alt+上下` でカーソル追加
- `Cmd+Shift+L` で全一致選択
- 矩形選択（Box Select）
- 実践: 変数リネーム、CSV編集、HTML一括変更

### 第6回: 検索・置換編 — プロジェクト横断の検索力
- ファイル内検索 `Cmd+F` / 置換 `Cmd+H`
- プロジェクト全体検索 `Cmd+Shift+F`
- 正規表現の活用
- ファイルフィルタ（`*.py`, `!node_modules`）
- 検索結果からの一括置換

### 第7回: 拡張機能編（基礎） — エコシステムを使いこなす
- 拡張機能のインストール方法（GUI / CLI）
- Python 開発必須6選（Python, Pylance, Ruff, Jupyter, Debugger, autoDocstring）
- 汎用おすすめ6選（GitLens, Remote-SSH, Error Lens, indent-rainbow, Path Intellisense, Japanese Pack）
- `.vscode/extensions.json` による推奨拡張の共有

### 第8回: 統合ターミナル編 — エディタ内で完結する開発
- ターミナルの表示・作成・分割
- プロジェクトルートでの自動起動
- エラー出力からのファイルジャンプ
- 複数ターミナルの並行利用
- ターミナル設定のカスタマイズ

### 第9回: Git 連携編 — GUIでバージョン管理
- Source Control パネルの使い方
- Stage / Unstage / Commit / Push / Pull
- diff 表示と Gutter Indicators
- ブランチ作成・切替（ステータスバーから）
- Merge Conflict の解消（Accept Current / Incoming）
- GitLens による blame と履歴確認

### 第10回: Remote SSH 編 — サーバーで開発する
- Remote - SSH 拡張機能のセットアップ
- `~/.ssh/config` の設定方法
- 研究室サーバー（pws-160core, pws-gpu）への接続
- リモートでの拡張機能インストール
- ファイル編集・ターミナル・デバッグの統合

### 第11回: デバッグ編 — print文からの卒業
- ブレークポイントの設定と種類（通常・条件付き・ログポイント）
- `F5` / `F10` / `F11` によるステップ実行
- Variables / Watch / Call Stack パネル
- Debug Console での式評価
- `launch.json` の設定（Current File / Flask / pytest）
- print デバッグとの比較

### 第12回: 設定・カスタマイズ編 — 自分だけの環境を作る
- User Settings vs Workspace Settings
- `settings.json` のおすすめ設定15選
- テーマ変更（One Dark Pro, Dracula, Catppuccin）
- フォント設定（Fira Code リガチャ）
- キーバインドのカスタマイズ
- 他エディタのキーマップ移行（Vim, Emacs, Sublime）

### 第13回: Workspace 活用編 — チーム開発の基盤
- `.vscode/` ディレクトリの構成（settings, launch, tasks, extensions）
- マルチルートワークスペース
- ユーザースニペットの作成
- Emmet によるHTML高速入力
- Task Runner による自動化（pytest, ruff, build）
- Compound Task による複合タスク

### 第14回: AI 支援 & 生産性編 — 最新ツールを活用する
- GitHub Copilot（学生無料）
- Continue / Cline / Cursor
- Zen Mode / Sticky Scroll / Breadcrumbs
- Outline View / Timeline View
- Quick Fix (`Cmd+.`)
- Peek Definition (`Alt+F12`)

### 第15回: 総合演習 & Tips 編 — 実践力を鍛える
- 実践課題: Python プロジェクトを VS Code で開発
- Remote SSH でサーバー上のコードをデバッグ
- Git ブランチワークフロー演習
- よくあるトラブルシューティング
- さらなる学習リソース
- Q&A

---

## 技術スタック

- `terminal-slide` HTMLフォーマット準拠
- VS Code風UIシェル（タイトルバー / Activity Bar / タブ / ステータスバー）
- GIFデモ: Playwright + ffmpeg（コマンドパレット / マルチカーソル / デバッガ）
- GitHub Pages で自動デプロイ

## ファイル構成

```
pre-vscode/
  index.html           # GitHub Pages エントリ
  vscode-intro.html    # メインプレゼン（41スライド）
  assets/
    command-palette.gif # コマンドパレットデモ
    multi-cursor.gif    # マルチカーソルデモ
    debugger.gif        # デバッガデモ
  gif-src/             # GIF生成用HTMLシミュレーション
    capture.mjs        # Playwrightキャプチャスクリプト
    command-palette.html
    multi-cursor.html
    debugger.html
  .github/workflows/
    pages.yml          # GitHub Pages デプロイ
```

## ローカルでの表示

```bash
# terminal-slide がインストール済みの場合
terminal-slide vscode-intro.html

# または直接ブラウザで開く
open vscode-intro.html
```

## GIF の再生成

```bash
npm install
node gif-src/capture.mjs
# --only command-palette|multi-cursor|debugger で個別生成も可能
```
