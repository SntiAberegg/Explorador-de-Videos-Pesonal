import { VideoData } from '../types';

/*
  Ejemplos para usar videos locales:

  1) Usar la carpeta `public/` (más sencillo):
    - Coloca `mi-video.mp4` en `public/videos/mi-video.mp4`
    - En un objeto video usa: videoUrl: '/videos/mi-video.mp4'

  2) Importar el asset para que el bundler lo procese (requiere la declaración de módulos .mp4):
    - Mueve el archivo a `src/assets/videos/mi-video.mp4` o similar
    - Asegúrate de tener `types/custom.d.ts` con `declare module '*.mp4';` (ya creado)
    - Importa y usa:
      import miVideo from '../assets/videos/mi-video.mp4';
      videoUrl: miVideo

  El proyecto ya incluye la declaración `types/custom.d.ts` para soportar imports de .mp4, .webm y .ogg.
*/

const sampleVideos = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];


export const videoData: VideoData = {
  sections: [
    {
      id: "titulo",
      title: "TITULO",
      videos: [
        {
          id: "001",
          title: "PROYECTO 001",
          description: "Este es el primer proyecto destacado. Una exploración visual en blanco y negro sobre la forma y la ausencia de color, buscando el contraste puro.",
          duration: "15:30",
          category: "DESTACADO",
          thumbnail: "https://picsum.photos/seed/001/1600/900",
          videoUrl: sampleVideos[0]
        },
        {
          id: "002",
          title: "PROYECTO 002",
          description: "Una narrativa contada a través de sombras. Cada cuadro es una composición meticulosa de luz y oscuridad.",
          duration: "08:45",
          category: "CORTOMETRAJE",
          thumbnail: "https://picsum.photos/seed/002/1600/900",
          videoUrl: sampleVideos[1]
        },
        {
          id: "003",
          title: "PROYECTO 003",
          description: "El minimalismo llevado al extremo. Un estudio sobre el espacio negativo y su impacto en la percepción del espectador.",
          duration: "22:10",
          category: "EXPERIMENTAL",
          thumbnail: "https://picsum.photos/seed/003/1600/900",
          videoUrl: sampleVideos[2]
        },
        {
          id: "004",
          title: "PROYECTO 004",
          description: "La arquitectura de la ciudad despojada de su color, revelando líneas y geometrías ocultas a simple vista.",
          duration: "12:00",
          category: "DOCUMENTAL",
          thumbnail: "https://picsum.photos/seed/004/1600/900",
          videoUrl: sampleVideos[3]
        }
      ]
    },
    {
      id: "recientes",
      title: "RECIENTES",
      videos: [
        {
          id: "005",
          title: "ECOS",
          description: "Un viaje sonoro y visual a través de paisajes olvidados, donde solo quedan los ecos del pasado.",
          duration: "05:55",
          category: "VIDEOARTE",
          thumbnail: "https://picsum.photos/seed/005/1600/900",
          videoUrl: sampleVideos[4]
        },
        {
          id: "006",
          title: "SILENCIO",
          description: "Qué se escucha cuando no hay nada que oír. Una pieza contemplativa sobre la ausencia de sonido en un mundo ruidoso.",
          duration: "18:20",
          category: "CINE DE AUTOR",
          thumbnail: "https://picsum.photos/seed/006/1600/900",
          videoUrl: sampleVideos[5]
        },
        {
          id: "007",
          title: "TRAZOS",
          description: "La caligrafía como movimiento. Un pincel, tinta y papel cobran vida en esta pieza de animación experimental.",
          duration: "03:15",
          category: "ANIMACIÓN",
          thumbnail: "https://picsum.photos/seed/007/1600/900",
          videoUrl: sampleVideos[6]
        }
      ]
    },
    {
      id: "archivo",
      title: "ARCHIVO",
      videos: [
        {
          id: "008",
          title: "GÉNESIS",
          description: "El primer experimento. El punto de partida de toda esta exploración estética.",
          duration: "02:30",
          category: "ARCHIVO",
          thumbnail: "https://picsum.photos/seed/008/1600/900",
          videoUrl: sampleVideos[7]
        },
        {
          id: "009",
          title: "FRAGMENTOS",
          description: "Recortes y escenas descartadas que, juntas, forman una nueva narrativa inesperada.",
          duration: "25:00",
          category: "ARCHIVO",
          thumbnail: "https://picsum.photos/seed/009/1600/900",
          videoUrl: sampleVideos[8]
        },
        {
          id: "010",
          title: "BOCETOS",
          description: "Ideas en movimiento. Pruebas de cámara y concepto que nunca se convirtieron en proyectos finales.",
          duration: "11:40",
          category: "ARCHIVO",
          thumbnail: "https://picsum.photos/seed/010/1600/900",
          videoUrl: sampleVideos[9]
        },
        {
          id: "011",
          title: "PRUEBA DE LUZ",
          description: "Un estudio técnico sobre cómo la luz interactúa con diferentes texturas en un entorno monocromático.",
          duration: "09:05",
          category: "TÉCNICO",
          thumbnail: "https://picsum.photos/seed/011/1600/900",
          videoUrl: sampleVideos[10]
        }
      ]
    }
  ]
};
