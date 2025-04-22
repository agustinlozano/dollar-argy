## Game Stages

<aside>
💡

- MX se refiere a criaturas hostiles de diferente naturaleza. Esta tabla no incluye bosses.
- La vida base del player fue pensada en base al daño ejercido por 2 **freedom_projectile** + un ataque básico. Aunque los ataques de los enemigos serán diferentes y menos poderosos, con lo cual esta vida permite tanquear varios ataques de las criaturas hostiles en un combate.
- La vida del player en los siguientes niveles tiene que establecerse a partir del factor de escalado. El caul aun debe determinarse por nivel/game stage.
</aside>

### Vida

Usamos un growth progresivo x1.5 por stage.

| Stage | Player | M1  | M2  | M3  | M4  |
| ----- | ------ | --- | --- | --- | --- |
| Early | 25     | 20  | 20  | 35  | 45  |
| Mid   | 40     | 30  | 30  | 50  | 60  |
| Late  | 60     | 45  | 45  | 70  | 90  |

### Mana

<aside>
💡

La mana base del player fue pensada en un combate contra 3 M1 o 3 M2. Donde harían falta como mínimo 3 casteos de **freedom_projectile** + 6 ataques básicos en total para abatir a los tres.

</aside>

| Stage | Player | M1  | M2  | M3  | M4  |
| ----- | ------ | --- | --- | --- | --- |
| Early | 45     | 20  | 20  | 25  | 30  |
| Mid   | 70     | 30  | 30  | 40  | 45  |
| Late  | 100    | 40  | 40  | 55  | 60  |

### Niveles

<aside>
💡

Los niveles separados por (-) están dados en rangos. Los que no, es porque son los niveles máximos por criatura.

</aside>

| Stage | Player | M1    | M2    | M3    | M4    |
| ----- | ------ | ----- | ----- | ----- | ----- |
| Early | 1-30   | 1-10  | 1-10  | 10-20 | 20-30 |
| Mid   | 30-60  | 30-40 | 30-40 | 40-50 | 50-60 |
| Late  | 60-100 | 60    | 60    | 75    | 90    |
