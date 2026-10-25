# Kubex 3D — Gerando o .apk (Android)

Este projeto é um **modelador 3D móvel** (inspirado no Blender, tema preto e branco) construído com **Three.js** e empacotado como app Android via **Capacitor**.

> ⚠️ Este ambiente **não tem Android SDK / Java / Gradle**, portanto não é possível compilar o `.apk` aqui. Você precisa gerar o APK na sua máquina com o **Android Studio**.

---

## Pré-requisitos (na sua máquina)

1. **Node.js** — https://nodejs.org/
2. **Android Studio** — https://developer.android.com/studio
   - No Android Studio, instale via *SDK Manager*:
     - Android SDK Build-Tools (última versão)
     - Android SDK Platform-Tools
     - Uma plataforma Android (ex.: Android 14.0 / API 34)
   - Configure a variável de ambiente `ANDROID_HOME` (ou `ANDROID_SDK_ROOT`).

---

## Passo a passo para gerar o .apk

Abra o terminal na raiz deste projeto (`/home/user/Kubex-3D` ou clone o repo):

### 1. Instalar dependências do Capacitor
```bash
npm install
```

### 2. Inicializar o Capacitor (apenas na primeira vez)
```bash
npx cap init kubex3d "Kubex 3D" --web-dir=. --app-id=com.veexdevs.kubex3d
```

### 3. Adicionar plataforma Android
```bash
npx cap add android
```
Isso cria a pasta `android/` com o projeto nativo do Android.

### 4. Copiar os arquivos web para o Android
```bash
npx cap copy
```
Isso copia `index.html`, `css/`, `js/`, `assets/`, `manifest.json`, `sw.js` para `android/app/src/main/assets/www/`.

### 5. Abrir no Android Studio
```bash
npx cap open android
```

### 6. Compilar o APK
No Android Studio:
- **Build > Build Bundle(s) / APK(s) > Build APK(s)**
- Aguarde a compilação.
- O APK fica em: `android/app/build/outputs/apk/debug/app-debug.apk`

Para APK assinado (release):
- **Build > Generate Signed Bundle / APK**
- Você precisará de um keystore (`.jks`). Crie um no Android Studio se não tiver.

---

## Estrutura do projeto

```
Kubex-3D/
├── index.html             # interface do modelador (web app)
├── css/style.css          # tema preto e branco
├── js/app.js              # Three.js: cena, seleção, mover/rotacionar/escalar
├── manifest.json          # PWA manifest
├── sw.js                  # service worker (off-line)
├── assets/
│   ├── logo-kubex.png                 # logo com texto
│   └── logo-kubex-no-text.png         # ícone (símbolo do cubo + setas)
├── package.json           # dependências Capacitor
├── capacitor.config.json  # configuração do app (id, nome, webDir)
└── BUILD_APK.md           # este guia
```

---

## Funcionalidades do modelador

- Viewport 3D em tempo real (Three.js)
- Orbitar (arrastar), zoom e câmera com suavização
- Adicionar objetos: cubo, esfera, cilindro, cone, toro
- Selecionar objeto (toque/clique)
- Transformar: **Mover**, **Rotacionar**, **Escalar** (arrasto na tela)
- Excluir objeto selecionado
- Painel de propriedades: nome, tipo, localização, rotação, escala
- Tema preto e branco, com ícones de eixos X/Y/Z
- Instalável como PWA (tela inicial) e empacotável como `.apk` via Capacitor

---

## Dica para tela cheia no Android

No `capacitor.config.json` o `server.url` está apontando para localhost (útil para testar no emulador). Para build final, remova ou comente a seção `server` para que o app rode off-line a partir dos assets locais (`webDir: "."`).
