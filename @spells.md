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
