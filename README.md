# Kubex 3D

Modelador 3D móvel inspirado no Blender, com identidade visual **preto e branco** e a marca **Kubex 3D** (logo anexada).

> **Este não é um site simples:** é um projeto **Capacitor** pronto para ser compilado em **`.apk` (Android)**.  
> O binário `.apk` é gerado automaticamente pelo **GitHub Actions** a cada push (veja abaixo). Não é necessário instalar o Android Studio.

## O que está incluído

- `www/index.html`, `www/css/`, `www/js/` — interface e motor Three.js do modelador (estilo Blender)
- `www/assets/logo-kubex.png` / `www/assets/logo-kubex-no-text.png` — logos anexadas (preto e branco)
- `www/manifest.json` + `www/sw.js` — PWA (instalável na tela inicial, off-line)
- `android/` — projeto Android nativo **incluído**; abra no Android Studio e gere o `.apk`
- `capacitor.config.json` — configuração Capacitor (`appId: com.veexdevs.kubex3d`, `webDir: www`)
- `BUILD_APK.md` — guia para gerar o `.apk` no Android Studio

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

## Baixando o .apk compilado (GitHub Actions)

O APK é compilado automaticamente na nuvem do GitHub a cada push. Para baixar:

1. Acesse a aba **Actions** deste repositório: `https://github.com/Veexdevs/Kubex-3D/actions`
2. Clique na execução mais recente de **Build APK**.
3. Em **Artifacts**, baixe **`Kubex-3D-APK`** (extraia o `.zip` para obter o `app-debug.apk`).
4. Instale o `.apk` no seu Android (permita "Instalar apps desconhecidos" se pedir).

Ou dispare manualmente: aba Actions → **Build APK** → **Run workflow**.

## Gerando o .apk localmente (Android Studio)

Veja `BUILD_APK.md`. Resumo:

```bash
npm install
npx cap init kubex3d "Kubex 3D" --web-dir=www
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
