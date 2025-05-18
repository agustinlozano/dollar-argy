export const DialogueActionType = {
  END: "endDialogue",
  GIVE_ITEM: "giveItem",
  START_BATTLE: "startBattle",
  SET_FLAG: "setFlag",
  UNLOCK_LOCATION: "unlockLocation",
  TRIGGER_EVENT: "triggerEvent",
};

export const DialogueActionPayloadKey = {
  ITEM_ID: "itemId",
  FLAG: "flag",
  LOCATION_ID: "locationId",
  EVENT_ID: "eventId",
};

export const DialogueSpeaker = {
  PLAYER: "player",
  NPC: "npc",
};
