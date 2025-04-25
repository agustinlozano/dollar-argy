import {
  PillBottleIcon as Potion,
  Sword,
  Shield,
  Scroll,
  Gem,
  Skull,
  Flame,
  Zap,
  Sparkles,
  Target,
  Clock,
  Heart,
  Droplets,
} from "lucide-react";

export function DetailPanel({ selectedItem, selectedSpell, activeTab }) {
  if (activeTab === "items" && selectedItem) {
    return <ItemDetails item={selectedItem} />;
  } else if (activeTab === "spells" && selectedSpell) {
    return <SpellDetails spell={selectedSpell} />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Skull className="h-12 w-12 text-[#3a3124] mb-4" />
        <p className="text-[#a3a090]">Select an item to view details</p>
      </div>
    );
  }
}

function ItemDetails({ item }) {
  const getItemIcon = () => {
    switch (item.category) {
      case "potion":
        return <Potion className="h-8 w-8" />;
      case "weapon":
        return <Sword className="h-8 w-8" />;
      case "armor":
        return <Shield className="h-8 w-8" />;
      case "scroll":
        return <Scroll className="h-8 w-8" />;
      case "amulet":
        return <Gem className="h-8 w-8" />;
      default:
        return <Skull className="h-8 w-8" />;
    }
  };

  const getItemTypeColor = () => {
    if (item.type.includes("consumable")) return "text-[#a3c2c2]";
    if (item.type.includes("equipable")) return "text-[#d4af37]";
    return "text-[#c9a959]";
  };

  const getEffectIcon = (effect) => {
    switch (effect.type) {
      case "heal":
        return <Heart className="h-5 w-5 text-[#d45050]" />;
      case "mana_restore":
        return <Droplets className="h-5 w-5 text-[#5080d4]" />;
      case "attack_up":
        return <Sword className="h-5 w-5 text-[#d4c050]" />;
      case "attack_down":
        return <Sword className="h-5 w-5 text-[#a3a090]" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#50d4a0]" />;
    }
  };

  return (
    <div className="relative h-full p-4">
      <SubPanel />
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#3a3124]">
        <div className={`p-2 bg-[#252016] ${getItemTypeColor()}`}>
          {getItemIcon()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#e0d5b8]">{item.name}</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#a3a090]">
              {item.category}
            </span>
            <span className="text-xs px-2 py-0.5 bg-[#252016] text-[#a3a090]">
              {item.type.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-bold text-[#c9a959] mb-2">Description</h3>
        <p className="text-sm text-[#d0c8b5]">{item.description}</p>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#c9a959] mb-2">Effects</h3>
        <div className="space-y-3">
          {item.effects.map((effect, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-[#252016] border border-[#3a3124]"
            >
              <div className="mt-0.5">{getEffectIcon(effect)}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#e0d5b8] capitalize">
                    {effect.type.replace("_", " ")}
                  </h4>
                  <span className="text-xs px-2 py-0.5 bg-[#1a1510] text-[#a3a090]">
                    {effect.duration.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-[#a3a090] mt-1">
                  {effect.type.includes("up") || effect.type.includes("down")
                    ? `${effect.value * 100}% modifier`
                    : `Value: ${effect.value}`}
                </p>
                {effect.area && (
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="h-3 w-3 text-[#a3a090]" />
                    <span className="text-xs text-[#a3a090]">
                      Area: {effect.area}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {item.useLimit && (
        <div className="mt-4 flex items-center gap-2 text-sm text-[#a3a090]">
          <Clock className="h-4 w-4" />
          <span>Use limit: {item.useLimit} per battle</span>
        </div>
      )}
    </div>
  );
}

function SpellDetails({ spell }) {
  const getSpellIcon = () => {
    switch (spell.type) {
      case "offensive-spell":
        return <Flame className="h-8 w-8 text-[#d45050]" />;
      case "defensive-spell":
        return <Shield className="h-8 w-8 text-[#5080d4]" />;
      case "utility-spell":
        return <Sparkles className="h-8 w-8 text-[#50d4a0]" />;
      case "buff-spell":
        return <Zap className="h-8 w-8 text-[#d4c050]" />;
      default:
        return <Skull className="h-8 w-8" />;
    }
  };

  const getEffectIcon = (effect) => {
    switch (effect.type) {
      case "damage":
        return <Flame className="h-5 w-5 text-[#d45050]" />;
      case "heal":
        return <Heart className="h-5 w-5 text-[#50d4a0]" />;
      case "attack_up":
        return <Sword className="h-5 w-5 text-[#d4c050]" />;
      case "attack_down":
        return <Sword className="h-5 w-5 text-[#a3a090]" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#9059c9]" />;
    }
  };

  return (
    <div className="relative h-full p-4">
      <SubPanel />
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#3a3124]">
        <div className="p-2 bg-[#252016]">{getSpellIcon()}</div>
        <div>
          <h2 className="text-xl font-bold text-[#e0d5b8]">{spell.name}</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#a3a090]">
              {spell.type.replace("-", " ")}
            </span>
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3 text-[#9059c9]" />
              <span className="text-xs text-[#9059c9]">{spell.manaCost}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-bold text-[#c9a959] mb-2">Description</h3>
        <p className="text-sm text-[#d0c8b5]">{spell.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col items-center justify-center p-3 bg-[#252016] border border-[#3a3124]">
          <span className="text-xs text-[#a3a090] mb-1">Targeting</span>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-[#e0d5b8]" />
            <span className="text-sm font-bold text-[#e0d5b8] capitalize">
              {spell.targeting}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-3 bg-[#252016] border border-[#3a3124]">
          <span className="text-xs text-[#a3a090] mb-1">Cooldown</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-[#e0d5b8]" />
            <span className="text-sm font-bold text-[#e0d5b8]">
              {spell.cooldown} {spell.cooldown === 1 ? "turn" : "turns"}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#c9a959] mb-2">Effects</h3>
        <div className="space-y-3">
          {spell.effects.map((effect, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-[#252016] border border-[#3a3124]"
            >
              <div className="mt-0.5">{getEffectIcon(effect)}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#e0d5b8] capitalize">
                    {effect.type.replace("_", " ")}
                  </h4>
                  <span className="text-xs px-2 py-0.5 bg-[#1a1510] text-[#a3a090]">
                    {effect.duration.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-[#a3a090] mt-1">
                  {effect.type.includes("up") || effect.type.includes("down")
                    ? `${effect.value * 100}% modifier`
                    : `Value: ${effect.value}`}
                </p>
                {effect.area && (
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="h-3 w-3 text-[#a3a090]" />
                    <span className="text-xs text-[#a3a090]">
                      Area: {effect.area}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {spell.strongAgainst && spell.strongAgainst.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold text-[#c9a959] mb-2">
            Strong Against
          </h3>
          <div className="flex flex-wrap gap-2">
            {spell.strongAgainst.map((strength, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-[#252016] text-[#d4c050] border border-[#3a3124] capitalize"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>
      )}

      {spell.sideEffects && spell.sideEffects.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold text-[#c9a959] mb-2">
            Side Effects
          </h3>
          <div className="space-y-2">
            {spell.sideEffects.map((effect, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-[#252016] border border-[#3a3124]"
              >
                {getEffectIcon(effect)}
                <div>
                  <span className="text-xs text-[#e0d5b8] capitalize">
                    {effect.type.replace("_", " ")}
                  </span>
                  {effect.requires && (
                    <span className="text-xs text-[#a3a090] ml-1">
                      (vs {effect.requires})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
