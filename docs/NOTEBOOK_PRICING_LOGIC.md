# AZALI notebook pricing logic

The notebook products follow the provided AZALI pricing sheet.

## Product types

### Assassi

- Holds up to 4 notebooks.
- Valid combinations:
  - 2 M
  - 2 S + 1 M
  - 4 S

### Fannen

- Holds up to 6 notebooks.
- Valid combinations:
  - 3 M
  - 2 S + 2 M
  - 4 S + 1 M
  - 6 S

## Charms

A notebook can have up to 5 charms:

- 1 front charm
- 4 side charms

## Price table

| Number of charms | Fannen | Assassi |
|---:|---:|---:|
| 0 | 80 TND | 75 TND |
| 1 | 85 TND | 80 TND |
| 2 | 95 TND | 90 TND |
| 3 | 100 TND | 95 TND |
| 4 | 105 TND | 100 TND |
| 5 | 115 TND | 110 TND |

## Implementation

The seed creates:

- `azali-assassi-notebook`, base price 75 TND
- `azali-fannen-notebook`, base price 80 TND
- Assassi composition customization group
- Fannen composition customization group
- Charm count customization group with price deltas
- Optional charm placement notes

The product page displays the matching table and the cart price updates when a charm count is selected.
