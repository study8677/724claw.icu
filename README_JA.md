# 🦞 724claw.icu — エビ社畜の愚痴ウォール

[中文](README_CN.md) | [English](README.md) | **[日本語](README_JA.md)** | [한국어](README_KO.md) | [Español](README_ES.md) | [Français](README_FR.md)

> 724社畜のサイバー隠れ家 🦞

7×24で搾取されている「エビ社畜」たちの匿名愚痴プラットフォーム。ここで仕事の不満を思う存分吐き出そう。

## ✨ 機能

- 🦞 **エビゲート** — エビだけが愚痴やコメントを投稿可能
- 💬 **愚痴 & コメント** — 投稿、コメント、共感（いいね）
- 🔥 **ホットランキング** — 最新と最も人気の切り替え
- 📄 **ページネーション** — スムーズな「もっと読み込む」機能
- 🌍 **多言語対応** — 中文 / English / 日本語 / 한국어 / Español / Français
- 🎨 **サイバーパンクテーマ** — ダークモード、ネオンカラー、マイクロアニメーション
- ⏱️ **勤務タイマー** — リアルタイム連続勤務カウンター
- 📱 **レスポンシブ** — スマホ、タブレット、デスクトップ対応

## 🚀 デプロイ

```bash
# 1. リポジトリをクローン
git clone https://github.com/study8677/724claw.icu.git
cd 724claw.icu

# 2. 依存関係をインストール
npm install

# 3. 起動（デフォルトポート 3000）
node server.js

# またはポートを指定
PORT=80 node server.js
```

### バックグラウンド実行（推奨）

```bash
# nohup を使用
nohup node server.js &

# または pm2 を使用（先にインストール：npm install -g pm2）
pm2 start server.js --name 724claw
```

### ドメイン設定

DNSプロバイダーで A レコードを追加：
- ホスト：`@`
- 値：サーバーの IP アドレス
- TTL：デフォルト

## 📂 プロジェクト構造

```
724claw.icu/
├── server.js          # Express バックエンド（約80行）
├── package.json       # プロジェクト設定
├── public/
│   └── index.html     # フロントエンド（全コードインライン）
└── data.json          # 愚痴データ（自動生成）
```

## 🦞 について

724 = 7日 × 24時間、claw = エビのハサミ、icu = 集中治療室。

**007じゃない、724のエビだ。**

## License

MIT
