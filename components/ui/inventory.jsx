"use client";

import { useState, useRef, useEffect } from "react";
import { Coins, Wand2, Sparkles, Gift, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Datos de ejemplo
const defaultItems = [
  {
    id: "G3v8Ax",
    name: "Gold Coins",
    slug: "gold_coins",
    value: 1,
    type: "coins",
    color: "#FFD700",
    description: "Shiny gold coins used for transactions.",
    expirationTurns: 0,
    isRedeemed: false,
    quantity: 9,
  },
  {
    id: "zgvE_8",
    name: "Reward Voucher",
    slug: "reward_voucher",
    value: 50,
    type: "voucher",
    color: "#FF6347",
    description: "A voucher that can be redeemed for rewards.",
    expirationTurns: 5,
    isRedeemed: false,
  },
];

const defaultSpells = [
  {
    name: "Rapid Fire",
    description: "Unleash a barrage of quick shots.",
    color: {
      explosion: "#FF4500",
      projectile: "#FFA500",
    },
    speed: "medium",
    damage: "low",
    manaCost: "low",
    cooldown: "short",
    burstCount: 5,
    burstInterval: 0.1,
    type: "offensive",
    animation: "rapid_fire_cast",
    sound: "rapid_fire_launch",
  },
  {
    name: "Single Shot",
    description: "A single, powerful shot.",
    color: {
      explosion: "#FFD700",
      projectile: "#FFD700",
    },
    speed: "low",
    damage: "medium",
    manaCost: "medium",
    cooldown: "long",
    burstCount: null,
    burstInterval: null,
    type: "offensive",
    animation: "single_shot_cast",
    sound: "single_shot_launch",
  },
  {
    name: "Assault Rifle",
    description: "Rapid shots with high damage.",
    color: {
      explosion: "#FF0000",
      projectile: "#FF6347",
    },
    speed: "high",
    damage: "high",
    manaCost: "medium",
    cooldown: "short",
    burstCount: 3,
    burstInterval: 0.05,
    type: "offensive",
    animation: "assault_rifle_cast",
    sound: "assault_rifle_launch",
  },
];

export function InventoryMenu({
  items = defaultItems,
  spells = defaultSpells,
}) {
  const [activeTab, setActiveTab] = useState("items");
  const [contentHeight, setContentHeight] = useState("auto");
  const itemsRef = useRef(null);
  const spellsRef = useRef(null);
  const contentRef = useRef(null);

  // Función para manejar el cambio de pestaña
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  // Actualizar la altura cuando cambia la pestaña activa
  useEffect(() => {
    const updateHeight = () => {
      if (activeTab === "items" && itemsRef.current) {
        setContentHeight(`${itemsRef.current.scrollHeight}px`);
      } else if (activeTab === "spells" && spellsRef.current) {
        setContentHeight(`${spellsRef.current.scrollHeight}px`);
      }
    };

    // Pequeño retraso para asegurar que el DOM se ha actualizado
    const timer = setTimeout(updateHeight, 50);

    // Configurar un observador de mutaciones para detectar cambios en el contenido
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(contentRef.current);
      return () => {
        resizeObserver.disconnect();
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="w-full max-w-md mx-auto font-['Press_Start_2P',system-ui] text-[0.8rem]">
      <Card className="border-4 border-[#352879] bg-[#0f0f1b] shadow-[0_0_0_4px_#000000,5px_5px_0_0_#000] rounded-none overflow-hidden">
        <CardHeader className="bg-[#352879] pb-3 px-4 pt-4 space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-normal text-[#f8d800] [text-shadow:2px_2px_0_#000]">
              INVENTARIO
            </CardTitle>
            <Button
              variant="outline"
              size="icon"
              className="rounded-none bg-[#f8d800] border-[#000] border-2 hover:bg-[#f8b800] shadow-[inset_-2px_-2px_0_0_#885800,inset_2px_2px_0_0_#fff]"
            >
              <Sparkles className="h-4 w-4 text-[#000]" />
            </Button>
          </div>
          <CardDescription className="text-[#8dc6ff] text-xs">
            ITEMS Y HECHIZOS
          </CardDescription>
        </CardHeader>

        <Tabs
          defaultValue="items"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="px-4 pt-2">
            <TabsList className="grid grid-cols-2 w-full bg-[#0f0f1b] border-2 border-[#352879] p-0 rounded-none">
              <TabsTrigger
                value="items"
                className="rounded-none data-[state=active]:bg-[#f8d800] data-[state=active]:text-[#000] data-[state=active]:shadow-[inset_-2px_-2px_0_0_#885800,inset_2px_2px_0_0_#fff] text-[#8dc6ff] py-1 px-2 transition-all duration-200"
              >
                <Coins className="mr-2 h-4 w-4" />
                ITEMS
              </TabsTrigger>
              <TabsTrigger
                value="spells"
                className="rounded-none data-[state=active]:bg-[#f8d800] data-[state=active]:text-[#000] data-[state=active]:shadow-[inset_-2px_-2px_0_0_#885800,inset_2px_2px_0_0_#fff] text-[#8dc6ff] py-1 px-2 transition-all duration-200"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                SPELLS
              </TabsTrigger>
            </TabsList>
          </div>

          <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ height: contentHeight }}
          >
            <CardContent className="p-4 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat">
              <TabsContent
                value="items"
                ref={itemsRef}
                className="mt-0 space-y-4 transition-all duration-300 animate-in fade-in-50"
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start p-3 bg-[#0f0f1b] border-2 border-[#352879] hover:border-[#f8d800] transition-all duration-200 shadow-[3px_3px_0_0_#000] hover:translate-y-[-2px]"
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 flex items-center justify-center mr-3 border-2"
                      style={{
                        backgroundColor: `#0f0f1b`,
                        border: `2px solid ${item.color}`,
                      }}
                    >
                      {item.type === "coins" ? (
                        <Coins
                          style={{ color: item.color }}
                          className="h-6 w-6"
                        />
                      ) : (
                        <Gift
                          style={{ color: item.color }}
                          className="h-6 w-6"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-normal text-[#f8d800]">
                          {item.name}
                        </h3>
                        {item.quantity && (
                          <Badge
                            variant="outline"
                            className="bg-[#352879] text-[#f8d800] border-[#f8d800] rounded-none px-2 text-xs"
                          >
                            x{item.quantity}
                          </Badge>
                        )}
                        {item.value && !item.quantity && (
                          <Badge
                            variant="outline"
                            className="bg-[#352879] text-[#f8d800] border-[#f8d800] rounded-none px-2 text-xs"
                          >
                            {item.value} pts
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs text-[#8dc6ff] mt-1">
                        {item.description}
                      </p>

                      {item.expirationTurns > 0 && (
                        <div className="mt-2 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-[#ff004d]" />
                          <span className="text-xs text-[#ff004d]">
                            Expira en {item.expirationTurns} turnos
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent
                value="spells"
                ref={spellsRef}
                className="mt-0 space-y-4 transition-all duration-300 animate-in fade-in-50"
              >
                {spells.map((spell, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#0f0f1b] border-2 border-[#352879] hover:border-[#f8d800] transition-all duration-200 shadow-[3px_3px_0_0_#000] hover:translate-y-[-2px]"
                  >
                    <div className="flex items-start">
                      <div
                        className="flex-shrink-0 w-12 h-12 flex items-center justify-center mr-3 border-2"
                        style={{
                          background: `#0f0f1b`,
                          border: `2px solid ${spell.color.projectile}`,
                        }}
                      >
                        <Wand2
                          style={{ color: spell.color.explosion }}
                          className="h-6 w-6"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-normal text-[#f8d800]">
                            {spell.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-[#352879] text-[#f8d800] border-[#f8d800] rounded-none px-2 text-xs"
                          >
                            {spell.type}
                          </Badge>
                        </div>

                        <p className="text-xs text-[#8dc6ff] mt-1">
                          {spell.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#8dc6ff]">DAÑO</span>
                          <span className="font-normal text-[#f8d800]">
                            {spell.damage}
                          </span>
                        </div>
                        <div className="h-4 w-full mt-1 bg-[#0f0f1b] border-2 border-[#352879] p-0.5 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxSZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] bg-repeat"></div>
                          <div
                            className="h-full relative z-10"
                            style={{
                              width: `${
                                spell.damage === "low"
                                  ? 33
                                  : spell.damage === "medium"
                                  ? 66
                                  : 100
                              }%`,
                              background: `repeating-linear-gradient(
                                to right,
                                #ff004d,
                                #ff004d 2px,
                                #ff2867 2px,
                                #ff2867 4px
                              )`,
                              boxShadow: "0 0 4px 0 rgba(255, 0, 77, 0.7)",
                            }}
                          >
                            {spell.damage !== "low" && (
                              <div className="absolute top-0 right-0 h-full w-1 bg-white animate-pulse"></div>
                            )}
                            {spell.damage === "high" && (
                              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxSZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] bg-repeat opacity-30"></div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#8dc6ff]">VELOCIDAD</span>
                          <span className="font-normal text-[#f8d800]">
                            {spell.speed}
                          </span>
                        </div>
                        <div className="h-4 w-full mt-1 bg-[#0f0f1b] border-2 border-[#352879] p-0.5 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxSZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] bg-repeat"></div>
                          <div
                            className="h-full relative z-10"
                            style={{
                              width: `${
                                spell.speed === "low"
                                  ? 33
                                  : spell.speed === "medium"
                                  ? 66
                                  : 100
                              }%`,
                              background: `repeating-linear-gradient(
                                to right,
                                #00e436,
                                #00e436 2px,
                                #29f761 2px,
                                #29f761 4px
                              )`,
                              boxShadow: "0 0 4px 0 rgba(0, 228, 54, 0.7)",
                            }}
                          >
                            {spell.speed !== "low" && (
                              <div className="absolute top-0 right-0 h-full w-1 bg-white animate-pulse"></div>
                            )}
                            {spell.speed === "high" && (
                              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxSZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] bg-repeat opacity-30"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </CardContent>
          </div>
        </Tabs>

        <CardFooter className="bg-[#0f0f1b] border-t-2 border-[#352879] flex justify-between p-4">
          <Button
            variant="outline"
            className="bg-[#0f0f1b] border-2 border-[#352879] text-[#8dc6ff] hover:bg-[#352879] hover:text-[#f8d800] rounded-none shadow-[3px_3px_0_0_#000] transition-all duration-200"
          >
            CERRAR
          </Button>
          <Button
            className={`bg-[#f8d800] hover:bg-[#f8b800] text-[#000] border-2 border-[#000] rounded-none shadow-[inset_-2px_-2px_0_0_#885800,inset_2px_2px_0_0_#fff,3px_3px_0_0_#000] transition-all duration-300 hover:translate-y-[-2px] ${
              activeTab === "items" ? "bg-[#f8d800]" : "bg-[#29f761]"
            }`}
          >
            {activeTab === "items" ? "USAR ITEM" : "EQUIPAR SPELL"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
