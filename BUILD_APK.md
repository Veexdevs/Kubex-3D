# Kubex 3D — Gerando o .apk (Android)

Este repositório já contém o **projeto Android nativo** pronto em `android/`. Você não precisa rodar o Capacitor novamente — basta abrir no Android Studio e gerar o APK.

> ⚠️ Este ambiente **não tem Android SDK / Java / Gradle**, portanto não é possível compilar o `.apk` aqui. Você deve gerar o APK na sua máquina com o **Android Studio**.

---

## Pré-requisitos (sua máquina)

- **Android Studio** — https://developer.android.com/studio
  - Via *SDK Manager*, instale: Android SDK Build-Tools, Platform-Tools e uma plataforma (ex.: Android 14 / API 34).
  - Configure `ANDROID_HOME` (ou `ANDROID_SDK_ROOT`).

---

## Como gerar o .apk (passo a passo)

1. Clone/abra este repositório na sua máquina.
2. Abra o Android Studio: **File > Open** → selecione a pasta `android/` deste projeto.
3. Aguarde o Gradle sincronizar (primeira vez pode demorar e baixar dependências).
4. **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
5. O APK fica em: `android/app/build/outputs/apk/debug/app-debug.apk`

Para APK assinado (release/Publicação):
- **Build > Generate Signed Bundle / APK** (é preciso de um keystore `.jks`).

---

## Estrutura do projeto

```
Kubex-3D/
├── www/                     # código-fonte web do app (comitado)
│   ├── index.html           # interface do modelador
│   ├── css/style.css        # tema preto e branco
│   ├── js/app.js            # Three.js: cena, seleção, mover/rotacionar/escalar
│   ├── assets/              # logos Kubex 3D (preto e branco)
│   ├── manifest.json        # PWA manifest
│   └── sw.js                # service worker
├── android/                 # projeto Android nativo (comitado — pronto p/ Android Studio)
├── capacitor.config.json    # config Capacitor (appId com.veexdevs.kubex3d)
├── package.json             # dependências (só se quiser regenerar com Capacitor)
├── BUILD_APK.md             # este guia
└── README.md
```

---

## Regenerar o projeto Android com Capacitor (opcional)

Se preferir recriar do zero (ex.: mudar `appId`):

```bash
npm install
npx cap init kubex3d "Kubex 3D" --web-dir=www
npx cap add android
npx cap copy
npx cap open android   # abre no Android Studio
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
- Tema preto e branco, ícones de eixos X/Y/Z
- Marca **Kubex 3D** com a logo anexada
