# Kubex 3D

Modelador 3D móvel inspirado no Blender, com identidade visual **preto e branco** e a marca **Kubex 3D** (logo anexada).

> **Este não é um site simples:** é um projeto **Capacitor** pronto para ser compilado em **`.apk` (Android)**.  
> O binário `.apk` é gerado automaticamente pelo **GitHub Actions** a cada push e publicado em **Releases**. Não é necessário instalar o Android Studio.

## 📱 Baixar o APK pronto

### **[⬇️ Baixar Kubex-3D.apk](https://github.com/Veexdevs/Kubex-3D/releases/download/v1.0.0/Kubex-3D.apk)**

Depois de baixar, abra o arquivo no Android e permita **Instalar apps desconhecidos** se o sistema pedir.

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
npm ci
npm run prepare:www
python3 -m http.server 5173 --bind 0.0.0.0 --directory www
# http://localhost:5173
```

## Baixando o .apk compilado (GitHub Actions + Releases)

O APK é compilado automaticamente na nuvem do GitHub a cada push.

- **Download direto:** https://github.com/Veexdevs/Kubex-3D/releases/download/v1.0.0/Kubex-3D.apk
- **Página da release:** https://github.com/Veexdevs/Kubex-3D/releases/tag/v1.0.0
- **Artifact da execução:** aba **Actions** → execução **Build APK** → **Artifacts** → `Kubex-3D-APK`.

Ou dispare manualmente: aba Actions → **Build APK** → **Run workflow**.

## Gerando o .apk localmente (Android Studio)

Veja `BUILD_APK.md`. Resumo:

```bash
npm ci
npm run cap:sync
npx cap open android
# No Android Studio: Build > Build APK(s)
```

## Tecnologias

- [Three.js](https://threejs.org/) — renderização 3D
- [Capacitor](https://capacitorjs.com/) — ponte web → app Android nativo
- Service Worker + Web App Manifest — PWA instalável
- Three.js copiado para `www/vendor/` durante o build — o APK não depende de CDN

---

Feito com foco em mobile, tema preto e branco, inspirado no Blender e na marca Kubex 3D.
