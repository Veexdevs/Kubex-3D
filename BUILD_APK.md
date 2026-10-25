# Kubex 3D — APK Android

## Baixar APK pronto (recomendado)

O APK é compilado pelo **GitHub Actions** e publicado em **Releases**:

**Download direto:** https://github.com/Veexdevs/Kubex-3D/releases/download/v1.0.0/Kubex-3D.apk

Página da release: https://github.com/Veexdevs/Kubex-3D/releases/tag/v1.0.0

Baixe `Kubex-3D.apk`, abra no celular e permita **Instalar apps desconhecidos** se o Android pedir.

## Como o GitHub gera o APK

O workflow `.github/workflows/build-apk.yml` roda a cada push e executa:

```bash
npm ci
npm run prepare:www
npx cap sync android
cd android && ./gradlew assembleDebug --no-daemon --stacktrace
```

Depois ele:

1. renomeia o resultado para `Kubex-3D.apk`;
2. verifica a assinatura com `apksigner`;
3. publica em **Actions → Artifacts**;
4. publica em **Releases → v1.0.0** para download direto pelo celular.

## Gerar localmente no Android Studio (opcional)

Pré-requisitos: Node.js 22, JDK 17 e Android Studio/SDK 34.

```bash
npm ci
npm run cap:sync
npx cap open android
```

No Android Studio: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

Saída: `android/app/build/outputs/apk/debug/app-debug.apk`

## Estrutura

```
Kubex-3D/
├── .github/workflows/build-apk.yml  # compila e publica o APK
├── www/                             # interface e motor 3D do app
│   ├── index.html
│   ├── css/style.css                # tema preto e branco
│   ├── js/app.js                    # Three.js e ferramentas
│   └── assets/                      # logos Kubex 3D
├── scripts/prepare-www.mjs          # copia o Three.js para dentro do app
├── android/                         # projeto Android/Capacitor
├── capacitor.config.json
└── package.json
```

O Three.js é copiado de `node_modules/three` para `www/vendor/three` durante o build. Assim, o APK funciona sem depender de CDN.
