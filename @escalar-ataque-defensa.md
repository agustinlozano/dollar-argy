### 📊 3. CÓMO ESCALAR ATAQUE Y DEFENSA

Keep it simple: 3 stats bases + modificadores contextuales.

### Por Nivel:

- **Ataque base**: `5 + (nivel / 2)`
- **Defensa base**: `3 + (nivel / 3)`

### Escalar Daño a los spells:

Daño `EFFECTS.DAMAGE`

- Early: Valores actuales (base)
- Mid: ×1.5 del daño base
- Late: ×2.25 del daño base

```
const scalingDamageFactor = {
  early: 1,
  mid: 1.5,
  late: 2.25
};
```

### Escalar Heal a los spells:

Heal `EFFECTS.HEAL` | Defensa `EFFECTS.DEFENSE_UP` | Attack `EFFECTS.ATTACK_UP` | Regen `EFFECTS.REGEN`

- Early: % actuales (base)
- Mid: +5%
- Late: +10%

```
const scalingHealFactor = {
  early: 0,
  mid: 5,
  late: 10
};
```

---

### Ejemplo de uso

```
import { scaleSpell } from './scaling';

// En algún lugar donde manejas el combate
const scaledSpell = scaleSpell(freedomDose, 'mid');
```
