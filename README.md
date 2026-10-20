# EMC共創フォーラム

EMC共創フォーラムの企画説明スライド（HTML・16:9・全11枚）です。

- スライド本体：`index.html`
- デザインのルール：[DESIGN.md](DESIGN.md)

ビルド不要の静的サイトなので、`index.html` をブラウザで開くだけで見られます。

## 公開のしかた

### GitHub Pages（GitHubだけで完結）

1. リポジトリの **Settings → Pages** を開く
2. **Source** を「Deploy from a branch」にし、公開したいブランチと `/ (root)` を選んで **Save**
3. 1〜2分後、`https://junsei0227.github.io/EMC_forum/` で見られるようになる

※ 無料プランでは、GitHub Pages はリポジトリが **Public** のときだけ使えます。

### Vercel

1. https://vercel.com に GitHub アカウントでログイン
2. **Add New → Project** でこのリポジトリを選ぶ
3. Framework Preset は「Other」のまま、設定を変えずに **Deploy**

Private リポジトリのままでも公開できます。以降は push するたびに自動で更新されます。
