// dialogues.js

import {
  DialogueActionType,
  DialogueActionPayloadKey,
  DialogueSpeaker,
} from "./dialogue.consts";
import { amuletOfDisguise } from "./items.consumable";

export const dialogues = {
  "greet-male-argentine": {
    id: "greet-male-argentine",
    participants: {
      player: { name: "Hornero Billete Argentino" },
      npc: { name: "Hombre Argentino", avatar: "paladin.png" },
    },
    steps: [
      {
        id: "p1",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¡Por fin un argentino! Hola, disculpe. ¿Qué tal?"],
        next: "n1",
      },
      {
        id: "n1",
        speaker: DialogueSpeaker.NPC,
        text: ["…"],
        next: "p2",
      },
      {
        id: "p2",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¿Me podría decir por qué está todo tan oscuro?"],
        next: "n2",
      },
      {
        id: "n2",
        speaker: DialogueSpeaker.NPC,
        text: ["…"],
        next: "p3",
      },
      {
        id: "p3",
        speaker: DialogueSpeaker.PLAYER,
        text: ["Como diría Gerson: sos un maleducado."],
        next: "n3",
      },
      {
        id: "n3",
        speaker: DialogueSpeaker.NPC,
        text: ["Yo no atiendo boludos."],
        action: {
          type: DialogueActionType.END,
          payload: null,
        },
      },
    ],
  },

  "greet-grumpy-man": {
    id: "greet-grumpy-man",
    participants: {
      player: { name: "Hornero Billete Argentino" },
      npc: { name: "Señor Gruñón", avatar: "grumpy-man.jpg" },
    },
    steps: [
      {
        id: "p1",
        speaker: DialogueSpeaker.PLAYER,
        text: ["Hola, señor. Le hago una consulta…"],
        next: "n1",
      },
      {
        id: "n1",
        speaker: DialogueSpeaker.NPC,
        text: ["…"],
        next: "p2",
      },
      {
        id: "p2",
        speaker: DialogueSpeaker.PLAYER,
        text: ["Por favor. ¿Me sabe decir por qué está todo tan sombrío?"],
        next: "n2",
      },
      {
        id: "n2",
        speaker: DialogueSpeaker.NPC,
        text: ["No quiero hablar con vos."],
        action: {
          type: DialogueActionType.END,
          payload: null,
        },
      },
    ],
  },

  "greet-melancholic-woman": {
    id: "greet-melancholic-woman",
    participants: {
      player: { name: "Hornero Billete Argentino" },
      npc: {
        name: "Señora Melancólica",
        avatar: "elderly-woman.jpg",
      },
    },
    steps: [
      {
        id: "p1",
        speaker: DialogueSpeaker.PLAYER,
        text: ["Hola, señora. Disculpe…"],
        next: "n1",
      },
      {
        id: "n1",
        speaker: DialogueSpeaker.NPC,
        text: ["Hola…"],
        next: "p2",
      },
      {
        id: "p2",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¿Me podría decir por qué está todo tan oscuro?"],
        next: "n2",
      },
      {
        id: "n2",
        speaker: DialogueSpeaker.NPC,
        text: ["La desesperanza, obviamente."],
        next: "p3",
      },
      {
        id: "p3",
        speaker: DialogueSpeaker.PLAYER,
        text: ["Falta de… ¿esperanza?"],
        next: "n3",
      },
      {
        id: "n3",
        speaker: DialogueSpeaker.NPC,
        text: [
          "Sí… se sabe. La desesperanza del pueblo hizo que vivamos en una noche perpetua.",
          "Conforme se fueron haciendo más fuertes, entonces doblegaron a todo aquel que se interpuso en su camino.",
        ],
        next: "p4",
      },
      {
        id: "p4",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¿Quiénes son ellos?"],
        next: "n4",
      },
      {
        id: "n4",
        speaker: DialogueSpeaker.NPC,
        text: ["Vos sabes… ¿O me estás tomando el pelo?"],
        next: "p5",
      },
      {
        id: "p5",
        speaker: DialogueSpeaker.PLAYER,
        text: [
          "No era mi intención molestarla.",
          "Es que aparecí acá y no sé bien dónde estoy.",
          "Solo recuerdo que estaba tratando de sobrevivir a algo terrorífico y de repente… desperté en este lugar.",
        ],
        next: "n5",
      },
      {
        id: "n5",
        speaker: DialogueSpeaker.NPC,
        text: [
          "Que forma tan extraña de vestirte, no deberías estar en esta tierra.",
          "Acaso eres un angel de la muerte? Tal vez ya he muerto después de todo.",
        ],
        next: "p6",
        // Ejemplo de payload: nos podría setear una quest flag
        action: {
          type: DialogueActionType.SET_FLAG,
          payload: {
            [DialogueActionPayloadKey.FLAG]: "needs-disguise",
          },
        },
      },
      {
        id: "p6",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¿?"],
        next: "n6",
      },
      {
        id: "n6",
        speaker: DialogueSpeaker.NPC,
        text: ["Disculpa, no puedo seguir hablando con vos. Te deseo suerte."],
        action: {
          type: DialogueActionType.END,
          payload: null,
        },
      },
    ],
  },

  "greet-fiscalist-paladin": {
    id: "greet-fiscalist-paladin",
    participants: {
      player: { name: "Hornero Billete Argentino" },
      npc: { name: "Hombre Misterioso", avatar: "paladin.png" },
    },
    steps: [
      {
        id: "n1",
        speaker: DialogueSpeaker.NPC,
        text: ["Huh? ¿Qué es esto?"],
        next: "p1",
      },
      {
        id: "p1",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¿Qué es qué?"],
        next: "n2",
      },
      {
        id: "n2",
        speaker: DialogueSpeaker.NPC,
        text: [
          "¿Qué hace un hornero clase mil y <i>Awaked</i> en estas tierras sombrías?",
          "¿Qué clase de truco es este? Te advierto que si no te explicas, voy a tener que usar mi espada.",
        ],
        next: "p2",
      },
      {
        id: "p2",
        speaker: DialogueSpeaker.PLAYER,
        text: [
          "¡EH! ¿De que hablas, flaco? No quiero hacerle daño a nadie. Por favor, no me lastimes.",
        ],
        next: "n3",
      },
      {
        id: "n3",
        speaker: DialogueSpeaker.NPC,
        text: ["¡Explicate!"],
        next: "p3",
      },
      {
        id: "p3",
        speaker: DialogueSpeaker.PLAYER,
        text: [
          "Despues de que me desperté, no recuerdo las cosas con claridad y estoy confundido.",
          "Solo veo una escena borrosa donde intentaba sobrevivir y tenia miedo. Recuerdo la fria daga que recibí por la espalda.",
          "Y todav siente un amargo sabor a traicion que me hace helar la sangre.",
        ],
        next: "n4",
      },
      {
        id: "n4",
        speaker: DialogueSpeaker.NPC,
        text: [
          "No es posible... Entonces es cierto... los rumores que corren entre los sabios de los <i>Ultimos Rioplaenses</i> son ciertos...",
        ],
        next: "p4",
      },
      {
        id: "p4",
        speaker: DialogueSpeaker.PLAYER,
        text: [
          "¿Qué rumores? ¿Por qué nuestro pueblo se ha vuelto tan oscuro?",
        ],
        next: "n5",
      },
      {
        id: "n5",
        speaker: DialogueSpeaker.NPC,
        text: [
          "No podemos seguir hablando en este lugar, es muy arriesgado. Además, no deberias revelar tu identidad a nadie.",
          "Tengo aquí un amuleto que te ayudará a ocultar tu forma. Solo cambiara tu apariencia, es seguro.",
        ],
        action: {
          type: DialogueActionType.GIVE_ITEM,
          payload: {
            [DialogueActionPayloadKey.ITEM_ID]: amuletOfDisguise.slug,
          },
        },
        next: "p5",
      },
      {
        id: "p5",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¡Qué lo parió! Ahora soy un Jefferson de $2."],
        next: "n6",
      },
      {
        id: "n8",
        speaker: DialogueSpeaker.NPC,
        text: [
          "Tenemos que salir de acá, ahora mismo. Por cierto, soy el Paladín Rohan, de la Ultima Orden Fiscalista Federal Argentina.",
        ],
        action: {
          type: DialogueActionType.END,
          payload: null,
        },
      },
    ],
  },

  "greet-mad-hologram-woman": {
    id: "greet-mad-hologram-woman",
    participants: {
      player: { name: "Hornero Billete Argentino" },
      npc: {
        name: "Señora Agresiva",
        avatar: "hologram-madwoman-portrait.jpg",
      },
    },
    steps: [
      {
        id: "n1",
        speaker: DialogueSpeaker.NPC,
        text: ["¡Vos sos el que me quiso robar!".toUpperCase()],
        next: "p1",
      },
      {
        id: "p1",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¿Qué? ¡Yo no le quise robar a nadie!"],
        next: "n2",
      },
      {
        id: "n2",
        speaker: DialogueSpeaker.NPC,
        text: ["¡Vos sos un holograma! ¡La c*nch4 de tu madre!".toUpperCase()],
        next: "p2",
      },
      {
        id: "p2",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¿¡Jajsja...!?"],
        next: "n4",
      },
      {
        id: "n4",
        speaker: DialogueSpeaker.NPC,
        text: ["¡Andate!".toUpperCase()],
        next: "p3",
      },
      {
        id: "p3",
        speaker: DialogueSpeaker.PLAYER,
        text: ["Che... ¿¡Alguien me puede ayudar... por favor!?"],
        next: "n5",
      },
      {
        id: "n5",
        speaker: DialogueSpeaker.NPC,
        text: ["¡Andate antes que te mate!".toUpperCase()],
        next: "p4",
      },
      {
        id: "p4",
        speaker: DialogueSpeaker.PLAYER,
        text: ["¿Que le pasa, vieja?"],
        next: "n6",
      },
      {
        id: "n6",
        speaker: DialogueSpeaker.NPC,
        text: ["¡Andate basura, b*gr0 ignorante!".toUpperCase()],
        next: "p5",
      },
      {
        id: "p5",
        speaker: DialogueSpeaker.PLAYER,
        text: ["Soy mas blanco que usted."],
        action: {
          type: DialogueActionType.END,
          payload: null,
        },
      },
    ],
  },
};
