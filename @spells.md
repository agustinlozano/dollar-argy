### SPELLS

<aside>
💡

- La fortaleza de los hechizos frente a conceptos de Magia Negra aumentan en un %5 la chance de golpe critico.
- Todos estos hechizos se pueden usar una sola vez por turno.
- La cantidad de hechizos que el player puede castear por turno depende del nivel, items o pasivas. Por defecto es un ataque básico (Dose of Freedom) + cualquier otro hechizo.
- Estos valores de daño corresponden a los de early game. (default)
- Los hechizos deberían tener un campo para usar como factor y potenciarlos conforme avanzan las etapas del juego (mid y late) o los niveles.
- Los costos de mana corresponden a los de early game. (default)
</aside>

**🔥 Spells: Ofensivos**

- **Dose of Freedom**: Ataque básico del juego, para poder repartir pequeñas dosis de libertad.

  - **Slug**: `freedom_dose`
  - **Costo de mana**: 0
  - **Cooldown**: 0
  - **Fuerte contra**: Ninguno
  - **Efectos**: Inflige 5 de daño a un solo objetivo durante 1 turno.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Ofensivo, Objetivo: Un solo enemigo, Animación: light_hit, Sonido: slap
  - **Nota de implementación**: Hechizo inicial sin costo, ideal para ataques básicos sin consumir recursos.

- **Freedom Missile**: Un disparo certero que quita 10 puntos de vida.

  - **Slug**: `freedom_projectile`
  - **Costo de mana**: 15
  - **Cooldown**: 0
  - **Fuerte contra**: Ninguno
  - **Efectos**: Inflige 10 de daño a un solo objetivo durante 1 turno.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Ofensivo, Objetivo: Un solo enemigo, Animación: bullet_hit, Sonido: whoosh
  - **Nota de implementación**: Hechizo de daño directo eficiente para enemigos individuales, sin enfriamiento.

- **Austerity Blast**: Golpe en área que congela enemigos con recortes presupuestarios.

  - **Slug**: `austerity_blast`
  - **Costo de mana**: 30
  - **Cooldown**: 1 turno
  - **Fuerte contra**: Inflación
  - **Efectos**: Inflige 5 de daño y aplica aturdimiento (stun) en un área de 4 unidades durante 1 turno.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Ofensivo, Objetivo: Área, Animación: ice_explosion, Sonido: frost_hit
  - **Nota de implementación**: Útil para controlar grupos de enemigos con su efecto de aturdimiento.

- **Lower Interest Rate**: Dispara daño leve en área y debuffea el ataque enemigo.

  - **Slug**: `interest_rate_drop`
  - **Costo de mana**: 25
  - **Cooldown**: 1 turno
  - **Fuerte contra**: Ninguno
  - **Efectos**: Inflige 5 de daño en un área de 3 unidades durante 1 turno.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Si el enemigo tiene el concepto de Inflación, reduce su ataque en 20% durante 1 turno.
  - **Cualquier otro dato técnico relevante**: Tipo: Ofensivo, Objetivo: Área, Animación: coin_rain, Sonido: soft_bang
  - **Nota de implementación**: Efectivo contra enemigos con Inflación, combina daño y debilitamiento.

- **Deregulation Ray**: Destruye trabas con pura eficiencia de mercado.

  - **Slug**: `deregulation_ray`
  - **Costo de mana**: 25
  - **Cooldown**: 1 turno
  - **Fuerte contra**: Burocracia, Corrupción
  - **Efectos**: Inflige 10 de daño a un solo objetivo durante 1 turno.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Ofensivo, Objetivo: Un solo enemigo, Animación: electric_beam, Sonido: zap
  - **Nota de implementación**: Especialmente útil contra enemigos con conceptos de Burocracia o Corrupción.

- **Mass Privatization**: Invoca una ráfaga de contratos que desmantelan enemigos públicos.

  - **Slug**: `mass_privatization`
  - **Costo de mana**: 50
  - **Cooldown**: 2 turnos
  - **Fuerte contra**: Corrupción
  - **Efectos**: Inflige 15 de daño a hasta 3 objetivos en un área durante 1 turno.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Ofensivo, Objetivo: Área, Animación: paper_storm, Sonido: stampede
  - **Nota de implementación**: Hechizo de alto costo para daño en área, ideal contra múltiples enemigos.

- **Laffer Bullet**: Proyectil que se potencia si bajás impuestos.

  - **Slug**: `laffer_bullet`
  - **Costo de mana**: 40
  - **Cooldown**: 2 turnos
  - **Fuerte contra**: Ninguno
  - **Efectos**: Inflige 10 de daño a un solo objetivo durante 1 turno.
  - **Efectos Extras**: Si el ítem "Lower Taxes" está equipado, aumenta la probabilidad de crítico en 100% de forma permanente.
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Ofensivo, Objetivo: Un solo enemigo, Animación: golden_bullet, Sonido: ka-ching
  - **Nota de implementación**: Requiere sinergia con el ítem "Lower Taxes" para maximizar su potencial crítico.

- **Fiscal Shock**: Reduce el gasto público en el área de impacto.

  - **Slug**: `fiscal_shock`
  - **Costo de mana**: 60
  - **Cooldown**: 3 turnos
  - **Fuerte contra**: Inflación
  - **Efectos**: Inflige 20 de daño en un área de 6 unidades durante 1 turno.
  - **Efectos Extras**: Si el enemigo tiene el concepto de Inflación, inflige 10 de daño adicional de forma permanente.
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Ofensivo, Objetivo: Área, Animación: explosive_chart, Sonido: boom
  - **Nota de implementación**: Hechizo de alto impacto con gran área de efecto, ideal contra enemigos con Inflación.

**🛡️ Defensivos**

- **Blinding Surveys**: Distracts an enemy with surveys, causing them to lose 1 turn.

  - **Slug**: `blinding_surveys`
  - **Costo de mana**: 10
  - **Cooldown**: 1 turno
  - **Fuerte contra**: Ninguno
  - **Efectos**: Forces a single enemy to skip their turn for 1 turn.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Defensivo, Objetivo: Un solo enemigo, Animación: survey_confusion, Sonido: paper_rustle, Color de aura: #D3D3D3
  - **Nota de implementación**: Low-cost spell for crowd control, effective for neutralizing a single enemy temporarily.

- **Liquidity Injection**: Restores 20% of health.

  - **Slug**: `liquidity_injection`
  - **Costo de mana**: 20
  - **Cooldown**: 1 turno
  - **Fuerte contra**: Ninguno
  - **Efectos**: Heals the caster for 20% of their maximum health for 1 turn.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Defensivo, Objetivo: Propio, Animación: liquidity_wave, Sonido: healing_whoosh, Color de aura: #00FA9A
  - **Nota de implementación**: Reliable self-healing spell for quick health recovery in combat.

- **Interest Rate Hike**: Increases defense by 10% against inflationary attacks and reduces attack by 25%.

  - **Slug**: `interest_rate_hike`
  - **Costo de mana**: 20
  - **Cooldown**: 3 turnos
  - **Fuerte contra**: Inflación
  - **Efectos**: Increases defense by 10% against enemies with the Inflation concept for 1 turn.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Reduces the caster's attack by 25% for 1 turn.
  - **Cualquier otro dato técnico relevante**: Tipo: Defensivo, Objetivo: Propio, Animación: ratehike_defense, Sonido: rate_up, Color de aura: #FFD700
  - **Nota de implementación**: Useful against Inflation-based enemies but comes with an attack penalty, requiring strategic timing.

- **Fiscal Surplus**: Protects with an aura that blocks inflationary attacks.

  - **Slug**: `fiscal_surplus`
  - **Costo de mana**: 60
  - **Cooldown**: 3 turnos
  - **Fuerte contra**: Inflación
  - **Efectos**: Increases defense by 100% against enemies with the Inflation concept for 1 turn.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Defensivo, Objetivo: Propio, Animación: surplus_aura, Sonido: shield_pop, Color de aura: #98FB98
  - **Nota de implementación**: High-cost spell offering complete protection against Inflation-based attacks for one turn.

- **Monetary Anchor**: Restores 5% of health per turn for an entire combat round.

  - **Slug**: `monetary_anchor`
  - **Costo de mana**: 40
  - **Cooldown**: Toda la duración del combate
  - **Fuerte contra**: Ninguno
  - **Efectos**: Grants 5% health regeneration per turn for the duration of one combat.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Defensivo, Objetivo: Propio, Animación: anchor_hold, Sonido: slow_beat, Color de aura: #4682B4
  - **Nota de implementación**: Long-term healing option, best used in prolonged fights due to its one-combat cooldown.

- **Central Bank Shutdown**: Blocks enemy mana and causes them to lose 1 turn.
  - **Slug**: `central_bank_shutdown`
  - **Costo de mana**: 60
  - **Cooldown**: 3 turnos
  - **Fuerte contra**: Ninguno
  - **Efectos**: Forces enemies in a small area (1 unit) to skip their turn for 1 turn.
  - **Efectos Extras**: Ninguno
  - **Efectos secundarios**: Ninguno
  - **Cualquier otro dato técnico relevante**: Tipo: Defensivo, Objetivo: Área, Animación: bank_seal, Sonido: lockdown, Color de aura: #A52A2A
  - **Nota de implementación**: High-cost crowd control spell, effective for disrupting multiple enemies in a small area.

**✨ Buffs / Support**

- **Free Market**: Desata el poder de los mercados sin cadenas.

  - **Slug**: `free_market`
  - **Mana Cost**: 35
  - **Cooldown**: 2 turns
  - **Strong Against**: None
  - **Effects**: Increases attack by 15% for 2 turns.
  - **Extra Effects**: None
  - **Side Effects**: None
  - **Any other relevant technical data**: Type: Buff, Target: Self, Animation: market_wave, Sound: money_flow
  - **Implementation Note**: Useful for boosting offensive capabilities temporarily, ideal for burst damage phases.

- **Free Exchange Rate**: Abre la puerta a los dólares.

  - **Slug**: `free_exchange_rate`
  - **Mana Cost**: 30
  - **Cooldown**: 2 turns
  - **Strong Against**: None
  - **Effects**: Grants 100% defense penetration for 1 turn.
  - **Extra Effects**: If the enemy has the Inflation or Regulations concept, increases critical chance by 10% for 1 turn.
  - **Side Effects**: None
  - **Any other relevant technical data**: Type: Buff, Target: Self, Animation: dollar_wave, Sound: cash_register
  - **Implementation Note**: Synergizes well against enemies with Inflation or Regulations, enhancing critical hit potential.

- **Country Risk Drop**: Suben los bonos y baja el miedo.

  - **Slug**: `country_risk_drop`
  - **Mana Cost**: 35
  - **Cooldown**: 2 turns
  - **Strong Against**: None
  - **Effects**: Increases defense by 15% for 1 turn. If the Bond Shorter concept is present, increases critical chance by 100% for 1 turn.
  - **Extra Effects**: None
  - **Side Effects**: None
  - **Any other relevant technical data**: Type: Buff, Target: Self, Animation: bond_rise, Sound: ding_positive
  - **Implementation Note**: Combines defensive boost with conditional critical chance increase, best used when Bond Shorter is active.
