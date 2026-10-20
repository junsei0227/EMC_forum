# フォーラムロゴ

| ファイル | 用途 |
| --- | --- |
| `logo.png` | 元画像（1254×1254, 透過PNG） |
| `logo-512.png` | ヘッダーなど表示用 |
| `favicon.ico` | ファビコン（16/32/48px） |
| `favicon-32x32.png` | PNGファビコン |
| `apple-touch-icon.png` | iOSホーム画面アイコン（180px） |

## 使い方

```html
<head>
  <link rel="icon" href="/assets/logo/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/logo/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/assets/logo/apple-touch-icon.png">
</head>

<header>
  <a href="/"><img src="/assets/logo/logo-512.png" alt="フォーラム" width="40" height="40"></a>
</header>
```
