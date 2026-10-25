# Kubex 3D

Modelador 3D móvel inspirado no Blender, com identidade visual **preto e branco** e a marca **Kubex 3D** (logo anexada).

> ⚠️ **Sobre o .apk:** Este repositório entrega o modelador como **aplicação web progressiva (PWA)** completa — funciona no navegador do celular e pode ser "instalada" na tela inicial como um app nativo. Um **.apk nativo** exige o Android SDK/NDK (Android Studio), que não está disponível neste ambiente. Veja a seção **"Gerando o .apk"** abaixo para empacotar você mesmo.

## O que está incluído

- `index.html` — interface (topbar, viewport 3D, barra de ferramentas inferior, painel de propriedades)
- `css/style.css` — tema preto e branco, estilo Blender
- `js/app.js` — motor Three.js: cena, câmera, controles de órbita, grade, seleção, mover/rotacionar/escalar, adicionar/excluir objetos, painel de propriedades
- `manifest.json` — manifesto PWA (instalável no celular)
- `sw.js` — service worker (funciona off-line e instala como app)
- `assets/logo-kubex.png` / `assets/logo-kubex-no-text.png` — logos anexadas

## Recursos (modelador Blender-like)

- Viewport 3D em tempo real (Three.js)
- Orbitar (arrastar), zoom e câmera com damping
- Adicionar objetos: cubo, esfera, cilindro, cone, toro
- Selecionar objeto (clique)
- Transformar: **Mover**, **Rotacionar**, **Escalar** (arrastar na tela)
- Excluir objeto selecionado
- Painel de propriedades: nome, tipo, localização, rotação, escala
- Tema preto e branco, ícones de eixos X/Y/Z
- Instalável como PWA (tela inicial do Android/iOS)

## Como executar localmente

```bash
# na raiz do projeto
python3 -m http.server 5173 --bind 0.0.0.0
# abra http://localhost:5173 no navegador
```

Ou com Node:

```bash
npx http-server -p 5173
```

## Instalar como app no celular (PWA)

1. Abra `http://<seu-ip>:5173` no Chrome do Android (ou Safari no iOS).
2. No Chrome: menu ⋮ → **"Adicionar à tela inicial"**.
3. No iOS: compartilhar → **"Na Tela Inicial"**.
4. O app Kubex 3D abre em tela cheia, sem barra de endereço, com o ícone da logo.

## Gerando o .apk nativo

Como não há Android SDK neste sandbox, gere o APK em sua máquina com Android Studio ou via Capacitor:

### Opção A — Capacitor (recomendado)

```bash
# 1. Instale as dependências
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init kubex3d "Kubex 3D" --web-dir=.

# 2. Adicione o Android
npx cap add android

# 3. Sincronize os arquivos web
npx cap copy
npx cap sync android

# 4. Abra no Android Studio e gere o APK
npx cap open android
# No Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
```

### Opção B — Android Studio (WebView)

1. Crie um projeto **Empty Activity** no Android Studio.
2. Copie os arquivos do projeto (`index.html`, `css/`, `js/`, `assets/`, `manifest.json`, `sw.js`) para `app/src/main/assets/www/`.
3. Ative JavaScript no `WebView` e carregue `file:///android_asset/www/index.html`.
4. Adicione permissão de internet se usar Three.js por CDN (ou baixe o Three.js e rode off-line).
5. Gere o APK: **Build > Build APK(s)**.

## Tecnologias

- [Three.js](https://threejs.org/) (via CDN) — renderização 3D
- Service Worker + Web App Manifest — PWA instalável
- HTML5/CSS/JS puro — sem build, sem dependências de compilação

---

Feito com foco em mobile, tema preto e branco, inspirado no Blender e na marca Kubex 3D.
