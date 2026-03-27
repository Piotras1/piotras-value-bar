## Piotras Value Bar
### Release v1.1.1

A highly customizable Home Assistant card for displaying sensor values as animated bars with color gradients, scale labels, and alarm indicators.  
Designed with a modern UI, smooth scaling, and a built-in visual editor.

Supports 3 bar orientations and 3 name/value layout modes — from compact single-row lists to vertical bar charts.

## ✨ Features
- 3 bar orientations (horizontal stepped, horizontal smooth, vertical)
- 3 name/value placement modes per orientation
- Fully scalable UI — adapts to any card width automatically
- Per-device color palette with up to 13 colors
- Alarm indicators with animated arrows
- Scale labels with configurable density
- Built-in visual editor support

---

## 🧩 Layout 1: Horizontal Bars — Stepped Gradient

![Zrzut ekranu (986)](https://github.com/user-attachments/assets/bb0088da-ca4e-4dad-9058-c94558f43362)

> 📸 *Left: card_layout 1 — Name | Bar | Value. Center: card_layout 2 — Name+Value above bar. Right: card_layout 3 — Value inside bar.*

### Description

Layout 1 renders horizontal bars where each color zone has a sharp, stepped edge between segments.  
The gradient is divided into equal sections — the number of colors in the `colors` field determines how many segments appear.  
Ideal for battery levels, percentages, or any metric where distinct color zones matter.

### card_layout options

- **card_layout 1** — Classic row: device name on the left, bar in the center, value on the right. Control column widths with `name_width` and `value_width`.
- **card_layout 2** — Name and value sit above the bar on a single line. Use `value_position` to swap left/right order.
- **card_layout 3** — Value is rendered directly inside the bar. Works best with a taller `bar_height`. Use `value_position` to place it left or right.

### Configuration

```yaml
type: custom:piotras-value-bar
header: "MY DEVICES"
layout: 1
card_layout: 1
bar_height: 12
spacing: 8
name_width: 110
value_width: 70
show_indicator: true
show_label: true
label_font_size: 9
label_mode: 3
devices:
  - entity: sensor.battery_level
    name: "Battery"
    min: 0
    max: 100
    unit: "%"
    colors: "1,2,3,4,5,5"
```

---

## 🧩 Layout 2: Horizontal Bars — Smooth Gradient

![Zrzut ekranu (987)](https://github.com/user-attachments/assets/e646870d-1484-4ba1-bcff-971297f7a5de)

> 📸 *Left: card_layout 1 — Name | Bar | Value. Center: card_layout 2 — Name+Value above bar. Right: card_layout 3 — Value inside bar.*

### Description

Layout 2 is identical in structure to Layout 1 but uses smooth color interpolation between palette colors instead of stepped segments.  
The transition between zones is gradual and visually softer — ideal for temperature sensors, signal strength, or any continuous metric.

### card_layout options

- **card_layout 1** — Classic row: device name on the left, bar in the center, value on the right.
- **card_layout 2** — Name and value sit above the bar. Use `value_position` to swap order.
- **card_layout 3** — Value rendered inside the bar. Works best with a taller `bar_height`.

### show_indicator modes

- **`show_indicator: true`** — Full gradient bar with a white pin marker that moves to the current value position.
- **`show_indicator: false`** — Progress fill mode: bar fills from left up to the current value, remainder is dimmed.

### Configuration

```yaml
type: custom:piotras-value-bar
header: "MY DEVICES"
layout: 2
card_layout: 1
bar_height: 12
spacing: 8
show_indicator: true
show_label: true
label_font_size: 9
devices:
  - entity: sensor.temperature
    name: "Temperature"
    min: 0
    max: 40
    unit: "°C"
    colors: "6,1,3,4,5"
```

---

## 🧩 Layout 3: Vertical Bars

![Zrzut ekranu (988)](https://github.com/user-attachments/assets/22f83a42-d044-4b07-8053-7172cabdc2ee)

> 📸 *Left: card_layout 1 — value and name centered below each bar. Right: card_layout 2 — values and names alternating above/below (staggered).*

### Description

Layout 3 renders all devices as vertical bars side by side, sharing a common baseline.  
A scale column on the left shows reference values with horizontal dashed grid lines extending across all bars.  
Bars fill from the bottom up — perfect for comparing multiple sensors at a glance.

Horizontal Scroll Navigation
When the number of devices exceeds the visible card width, Layout 3 supports horizontal scrolling. The scroll container wraps all rows (bars, values, names) so they move together as a single unit.
How it works
The scale column on the left is fixed outside the scroll container and always visible. All other content (bars + value row + name rows) sits inside a single overflow-x: auto div with width: max-content, ensuring every row is exactly as wide as the bars row — no row lags behind during scroll.

### card_layout options

- **card_layout 1** — Value and name are displayed centered directly below each bar, connected by a dashed line.
- **card_layout 2** — Values and names are staggered: even-indexed devices show name higher, odd-indexed show name lower. Reduces label crowding when bars are close together.

### show_indicator modes

- **`show_indicator: true`** — Full gradient bar from bottom to top with a white horizontal pin at the current value.
- **`show_indicator: false`** — Progress fill: bar fills with color from the bottom up to the current value, remainder is a dimmed track.

### Scale

The left-side scale column shows tick labels and horizontal dashed grid lines across all bars.  
Use `label_mode` to control the number of divisions (2–7 lines) and `label_font_size` to size the labels.  
The scale always represents 0–100% of each bar's own min/max range.

### Configuration

```yaml
type: custom:piotras-value-bar
header: "MY DEVICES"
layout: 3
bar_height: 20
height_bar: 150
bars_3_gap: 15
show_indicator: true
show_label: true
label_font_size: 9
label_mode: 3
devices:
  - entity: sensor.battery_level
    name: "Battery"
    min: 0
    max: 100
    unit: "%"
    colors: "5,5,4,3,2,1"
  - entity: sensor.temperature
    name: "Temp"
    min: 0
    max: 40
    unit: "°C"
    colors: "6,1,3,4,5"
```

---

## 🔔 Alarm Indicators

![Zrzut ekranu (989)](https://github.com/user-attachments/assets/f1c326d7-54b9-4516-8812-c99d37703b5e)

> 📸 *Left: alarm arrows on horizontal bars (▼ below min, ▲ above max). Right: alarm arrows on vertical bars (▶ left side for min, ◀ right side for max).*

Enable alarms with `alarm_on: true` at card level, then set `alarm_min` and/or `alarm_max` per device.  
When a value crosses a threshold the corresponding arrow appears and animates.

---

## ⚙️ Installation

### Method 1: Via HACS (Recommended)

1. Click the button below to automatically add the repository to your HACS:

<a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=Piotras1&repository=piotras-value-bar&category=plugin">
    <img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Open your Home Assistant instance">
</a>

2. Click **Add** in the pop-up window.
3. Once the repository page opens, click **Download**.
4. After downloading, do a **Hard reload** of your browser.

### Method 2: Manual Installation

1. Download this repository as a ZIP file and extract it.
2. Inside your Home Assistant `config/www/` directory, create a new folder named `piotras-value-bar`.
3. Copy the compiled files (from `dist/` folder) into `config/www/piotras-value-bar/`.
4. Go to **Settings → Dashboards → Resources**.
5. Click **Add Resource** and enter:
```
/local/piotras-value-bar/piotras-value-bar-loader.js?v=1.1.1
```
- Resource type: **JavaScript Module**
6. Hard reload your browser (`Ctrl+Shift+R`).

---

## ⚙️ Configuration Reference

### Card-level options

| Option | Type | Default | Layouts | Description |
|---|---|---|---|---|
| `header` | string | `""` | all | Text displayed at the top of the card |
| `layout` | number | `1` | all | Bar orientation: `1` = horizontal stepped, `2` = horizontal smooth, `3` = vertical |
| `card_layout` | number | `1` | all | Name/value placement: `1` = name\|bar\|value, `2` = name+value above bar, `3` = value inside bar |
| `show_header` | boolean | `true` | all | Show or hide the header text |
| `show_name` | boolean | `true` | all | Show device name |
| `show_values` | boolean | `true` | all | Show sensor values |
| `show_indicator` | boolean | `true` | all | `true` = full gradient + pin marker, `false` = progress fill mode |
| `show_shadow` | boolean | `false` | all | Show inner shadow on bars |
| `show_label` | boolean | `true` | all | Show scale labels below bars (L1/L2) or on left scale column (L3) |
| `alarm_on` | boolean | `false` | all | Enable alarm arrow indicators |
| `bar_height` | number | `12` | all | Bar thickness (px). In L3 this is the bar width |
| `height_bar` | number | `150` | 3 | Vertical bar height (px) |
| `bars_3_gap` | number | `15` | 3 | Gap between vertical bars (px) |
| `spacing` | number | `8` | 1, 2 | Gap between device rows (px) |
| `name_width` | number | `110` | 1, 2 (CL1) | Fixed width of the name column (px) |
| `value_width` | number | `70` | 1, 2 (CL1) | Fixed width of the value column (px) |
| `value_offset` | number | `8` | 1, 2 | Gap between name/bar/value elements (px) |
| `bar_value_gap` | number | `0` | 1, 2 | Extra gap between bar and scale labels (px) |
| `value_position` | number | `2` | CL2, CL3 | Value placement: `1` = left, `2` = right |
| `font_size` | number | `13` | all | Font size for names and values (px) |
| `font_style` | number | `1` | all | Font style: `1` = normal, `2` = small-caps, `3` = monospace, `4` = uppercase |
| `label_font_size` | number | `9` | all | Scale label font size (px). Set to `0` to hide |
| `label_mode` | number | `3` | all | Label density. L1/L2: `1`=2pts, `2`=3pts, `3`=7pts, `4`=13pts. L3: divisions 1–6 |
| `device_name_color` | string | HA default | all | Device name text color |
| `value_color` | string | HA default | all | Value text color (L3 CL3 defaults to white) |
| `header_font_size` | number | `15` | all | Header font size (px) |
| `header_align` | number | `2` | all | Header alignment: `1` = left, `2` = center, `3` = right |
| `header_font_color` | string | HA default | all | Header text color |

### Card appearance

| Option | Type | Default | Description |
|---|---|---|---|
| `background_color` | string | HA default | Card background color |
| `border_radius` | number | HA default | Card corner radius (px) |
| `border_width` | number | HA default | Card border width (px) |
| `border_color` | string | HA default | Card border color |
| `box_shadow` | string | HA default | Card box shadow CSS value |

### Color palette (card-level)

| Option | Type | Default | Description |
|---|---|---|---|
| `c1` … `c13` | string | see below | Override palette colors by index. Referenced in each device's `colors` field |

**Default palette:**

| Index | Color | Index | Color |
|---|---|---|---|
| 1 | `#4CAF50` 🟢 | 8 | `#00BCD4` 🩵 |
| 2 | `#8BC34A` 🟩 | 9 | `#FF9800` 🟠 |
| 3 | `#DDDD00` 🟡 | 10 | `#FF5722` 🔴 |
| 4 | `#FFA500` 🟠 | 11 | `#9C27B0` 🟣 |
| 5 | `#E53935` 🔴 | 12 | `#E91E63` 🩷 |
| 6 | `#2196F3` 🔵 | 13 | `#00E676` 💚 |
| 7 | `#03A9F4` 🩵 | | |

### Per-device options (under `devices:`)

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | — | Home Assistant entity ID (e.g. `sensor.battery_level`) |
| `name` | string | entity ID | Display name shown on the card |
| `min` | number | `0` | Minimum value — maps to the left/bottom of the bar |
| `max` | number | `100` | Maximum value — maps to the right/top of the bar |
| `unit` | string | `""` | Unit of measurement displayed next to the value |
| `precision` | number | `0` | Number of decimal places for the displayed value |
| `colors` | string | `"1,2,3,4,5,6"` | Comma-separated palette indices mapped left→right across the bar. Repeat an index to widen a zone (e.g. `"1,2,3,4,5,5"`) |
| `alarm_min` | number | — | Lower alarm threshold. Arrow indicator appears when value drops below this |
| `alarm_max` | number | — | Upper alarm threshold. Arrow indicator appears when value exceeds this |
| `tap_action` | object | `more-info` | Action on tap: `{action: "more-info"}` or `{action: "none"}` |

---
*Created by Piotras. Strictly engineered for reliability.*
