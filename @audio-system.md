# Sistema de Audio - Dollar Argy

El sistema de audio ha sido implementado para gestionar la música de fondo del juego de manera inteligente y extensible.

## Características

### 🎵 Funcionalidades Principales

- **Reproducción automática**: La música comienza después de la primera interacción del usuario (tecla, click, etc.)
- **Control completo**: Play, pause, siguiente, anterior, volumen, mute
- **Cola de reproducción**: Sistema de playlist extensible
- **Interfaz visual**: Reproductor minimalista en pantalla
- **Transiciones suaves**: Fade in/out para cambios graduales

### 🎮 Integración con el Juego

- **NPCs**: Pueden modificar la música cuando el jugador interactúa con ellos
- **Objetos**: Elementos del juego pueden cambiar la atmósfera musical
- **Zonas especiales**: Diferentes áreas pueden tener música temática
- **Eventos**: Batallas, diálogos, etc. pueden pausar o cambiar la música

## Estructura del Sistema

### Stores

- `useAudioStore.js`: Store principal con toda la lógica de audio
- Estado global accesible desde cualquier componente

### Hooks

- `useGameAudio.js`: Hook que integra el audio con el sistema de input del juego
- Maneja la detección de primera interacción del usuario

### Componentes

- `AudioPlayer.jsx`: Reproductor visual en la esquina inferior izquierda
- Controles básicos y información de la canción actual

## Cómo Agregar Nuevas Canciones

### 1. Agregar archivo de audio

```bash
# Coloca el archivo en la carpeta public/soundtracks/
public/soundtracks/mi-nueva-cancion.mp3
```

### 2. Actualizar la lista de canciones

```javascript
// En stores/useAudioStore.js, agregar a SOUNDTRACK_LIST:
{
  id: "mi-nueva-cancion",
  title: "Mi Nueva Canción",
  artist: "Artista",
  file: "/soundtracks/mi-nueva-cancion.mp3",
  duration: null,
}
```

## Ejemplos de Uso en NPCs/Objetos

### Reproducir canción inmediatamente

```javascript
import { useAudioStore } from "@/stores/useAudioStore";

const MiNPC = () => {
  const { playTrackImmediately } = useAudioStore();

  const handleInteraction = () => {
    // Cambiar música inmediatamente
    playTrackImmediately("mi-nueva-cancion");
  };

  return <mesh onClick={handleInteraction}>{/* Geometría del NPC */}</mesh>;
};
```

### Agregar a la cola de reproducción

```javascript
const MiObjeto = () => {
  const { addToQueue } = useAudioStore();

  const handleCollect = () => {
    // Agregar canción a la cola
    addToQueue("cancion-especial");
  };

  // ...
};
```

### Pausar música para diálogo importante

```javascript
const DialogoImportante = () => {
  const { fadeOutAndPause, resumeAndFadeIn } = useAudioStore();

  const startDialogue = () => {
    fadeOutAndPause(1000); // Pausar gradualmente en 1 segundo
  };

  const endDialogue = () => {
    resumeAndFadeIn(1000); // Reanudar gradualmente
  };

  // ...
};
```

### Cambiar volumen gradualmente

```javascript
const ZonaTenebrosa = () => {
  const { fadeVolume } = useAudioStore();

  const onPlayerEnter = () => {
    fadeVolume(0.2, 2000); // Reducir volumen a 20% en 2 segundos
  };

  const onPlayerExit = () => {
    fadeVolume(0.7, 2000); // Restaurar volumen a 70%
  };

  // ...
};
```

### Verificar estado de la música

```javascript
const MiComponente = () => {
  const { isMusicPlaying } = useAudioStore();

  const handleAction = () => {
    if (isMusicPlaying()) {
      console.log("La música está sonando");
    } else {
      console.log("No hay música reproduciéndose");
    }
  };

  // ...
};
```

## Controles de Usuario

### Atajos de teclado (por implementar)

- `Space`: Play/Pause
- `→`: Siguiente canción
- `←`: Canción anterior
- `M`: Mute/Unmute
- `↑/↓`: Subir/bajar volumen

### Interfaz visual

- Reproductor en esquina inferior izquierda
- Información de la canción actual
- Barra de progreso
- Controles de reproducción
- Control de volumen

## Futuras Mejoras

### 🎵 Audio

- Efectos de sonido (SFX)
- Audio 3D posicional
- Múltiples capas de audio simultáneas
- Filtros de audio (reverb, echo, etc.)

### 🎮 Gameplay

- Música dinámica basada en el estado del juego
- Transiciones inteligentes entre canciones
- Sistema de "jukebox" para que el jugador seleccione música
- Integración con sistema de logros (desbloquear canciones)

### 🎨 UI/UX

- Visualizador de audio
- Lyrics display
- Playlist personalizable
- Ecualizador

## Estructura de Archivos

```
stores/
├── useAudioStore.js          # Store principal de audio

hooks/
├── useGameAudio.js           # Hook de integración

components/ui/
├── audio-player.jsx          # Reproductor visual

public/soundtracks/
├── recant-thine-tales-by-dstechnician.mp3
└── [futuras canciones...]
```

## Notas Técnicas

- **Autoplay Policy**: El sistema respeta las políticas de autoplay de los navegadores
- **Performance**: Un solo elemento Audio para toda la aplicación
- **Memory**: Limpieza automática de event listeners
- **Accessibility**: Controles accesibles con ARIA labels
- **Mobile**: Compatible con dispositivos táctiles
