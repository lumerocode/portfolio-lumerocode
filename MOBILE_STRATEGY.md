# `src/data` — Shared data layer

Estos archivos contienen **solo datos puros** (sin imports de DOM, Tailwind, framer-motion, etc.) y son la **única fuente de verdad** del contenido del portafolio:

- `experience.ts` — Roles profesionales
- `projects.ts` — Proyectos destacados + filtros
- `tools.ts` — Stack profesional (íconos por nombre, sin imports)
- `certifications.ts` — Certificaciones

Edita el contenido aquí; los componentes web (`src/components/portfolio/*`) los leen directamente.

---

## Migración a React Native (Expo)

El proyecto web actual usa **TanStack Start (React + Vite SSR)**, que **no es compatible con React Native** — son runtimes distintos (DOM vs iOS/Android nativo). No se puede convertir el proyecto in-place; hay que crear un proyecto Expo paralelo.

### Pasos rápidos para crear la app móvil

```bash
# 1. Crear app Expo (fuera de este repo)
npx create-expo-app@latest luismelendez-mobile --template blank-typescript
cd luismelendez-mobile

# 2. Copiar la carpeta de datos tal cual
mkdir -p src/data
cp -r ../<este-repo>/src/data/* src/data/

# 3. Equivalentes nativos a instalar
npx expo install react-native-reanimated   # ≈ framer-motion
npx expo install react-native-svg          # para íconos
npm i react-native-svg-icons               # o usa lucide-react-native
npm i nativewind                           # Tailwind en RN (opcional)
```

### Mapeo web → React Native

| Web (este repo)        | React Native                         |
|------------------------|--------------------------------------|
| `<div>` / `<section>`  | `<View>`                             |
| `<p>` / `<span>`       | `<Text>`                             |
| `<button>`             | `<Pressable>` / `<TouchableOpacity>` |
| `framer-motion`        | `react-native-reanimated`            |
| `tailwind` classes     | `nativewind` o `StyleSheet`          |
| `react-icons/si`       | `lucide-react-native` (mapear nombres en `tools.ts`) |
| `react-router` / TanStack | `expo-router` (file-based)        |

### Lo que **sí** se reutiliza tal cual
- Toda la carpeta `src/data/` (texto, listas, tipos)
- Lógica de filtros y paginación (hooks puros)
- El diccionario i18n (`src/lib/i18n.tsx`) — extrae los objetos `en`/`es` a un archivo de datos similar y úsalos en RN con tu propio Provider.

### Lo que **no** se reutiliza
- Componentes en `src/components/portfolio/*` (usan DOM + Tailwind).
- `CustomCursor`, animaciones CSS marquee, `framer-motion` web.
- shadcn/ui (`src/components/ui/*`) — son Radix DOM.

### Alternativa más simple: PWA / Capacitor
Si solo quieres distribuir esta web como app en stores sin reescribir nada:
```bash
npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init
npx cap add ios && npx cap add android
```
Construyes el sitio normalmente y lo envuelves en una WebView nativa.
