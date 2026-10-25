# Kubex 3D

Modelador 3D móvel inspirado no Blender, com identidade visual **preto e branco** e a marca **Kubex 3D** (logo anexada).

> **Este não é um site simples:** é um projeto **Capacitor** pronto para ser compilado em **`.apk` (Android)**.  
> ⚠️ O binário `.apk` **não pode ser gerado neste ambiente** (sem Android SDK / Java / Gradle e sem permissão de rede para baixá-los). Você deve compilar no Android Studio na sua máquina — veja `BUILD_APK.md`.

## O que está incluído

- `index.html` — interface: topbar com logo Kubex 3D, viewport 3D, barra de ferramentas inferior (estilo Blender), painel de propriedades lateral
- `css/style.css` — tema preto e branco
- `js/app.js` — motor Three.js: cena, câmera, controles de órbita, grade, seleção, **mover / rotacionar / escalar** (arrasto na tela), adicionar/excluir objetos, painel de propriedades sincronizado
- `assets/logo-kubex.png` / `assets/logo-kubex-no-text.png` — logos anexadas
- `manifest.json` + `sw.js` — PWA (instalável na tela inicial, off-line)
- `package.json` + `capacitor.config.json` — configuração Capacitor para empacotar como app Android
- `BUILD_APK.md` — guia passo a passo para gerar o `.apk` no Android Studio

## Recursos (modelador Blender-like)

- Viewport 3D em tempo real (Three.js)
- Orbitar (arrastar), zoom e câmera com damping
- Adicionar objetos: cubo, esfera, cilindro, cone, toro
- Selecionar objeto (toque/clique)
- Transformar: **Mover**, **Rotacionar**, **Escalar** (arrasto na tela)
- Excluir objeto selecionado
- Painel de propriedades: nome, tipo, localização, rotação, escala
- Tema preto e branco, ícones de eixos X/Y/Z
- Instalável como PWA (tela inicial do Android/iOS)

## Executar localmente (web)

```bash
python3 -m http.server 5173 --bind 0.0.0.0
# http://localhost:5173
```

## Gerando o .apk (Android Studio)

Veja `BUILD_APK.md`. Resumo:

```bash
npm install
npx cap init kubex3d "Kubex 3D" --web-dir=. --app-id=com.veexdevs.kubex3d
npx cap add android
npx cap copy
npx cap open android
# No Android Studio: Build > Build APK(s)
```

## Tecnologias

- [Three.js](https://threejs.org/) — renderização 3D
- [Capacitor](https://capacitorjs.com/) — ponte web → app Android nativo
- Service Worker + Web App Manifest — PWA instalável
- HTML5/CSS/JS puro — sem build, sem dependências de compilação

---

Feito com foco em mobile, tema preto e branco, inspirado no Blender e na marca Kubex 3D.
