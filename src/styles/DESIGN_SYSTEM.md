# RPG UI Design System
## FF7R-Inspired Gaming Interface Language

**Purpose**: A portable design system specification for the portfolio that enables consistent FF7R/Matrix-inspired aesthetics.

**Last Updated**: January 2026

---

## 1. Design Philosophy

### Core Inspiration
- **Final Fantasy VII Remake**: Status screens, materia slots, equipment panels
- **The Matrix**: Neon green on black, digital rain, terminal aesthetics
- **Modern Gaming UIs**: Duolingo gamification, progression systems

### Target Emotions
- **Power**: "I am growing stronger"
- **Mastery**: "I understand this system"
- **Immersion**: "This feels like a game, not homework"

---

## 2. Color System (HSL)

All colors are defined in `src/index.css` as CSS variables:

```css
:root {
  /* Primary: Matrix Green */
  --primary: 142 76% 45%;
  --primary-foreground: 0 0% 100%;
  
  /* Background: Deep Black */
  --background: 0 0% 3%;
  --foreground: 0 0% 98%;
  
  /* Card: Elevated surfaces */
  --card: 0 0% 6%;
  --card-foreground: 0 0% 98%;
  
  /* Muted: Secondary content */
  --muted: 0 0% 12%;
  --muted-foreground: 0 0% 60%;
  
  /* Extended Palette */
  --gold: 45 93% 47%;
  --warning: 38 92% 50%;
  --success: 142 76% 45%;
  --destructive: 0 72% 51%;
}
```

---

## 3. Component Library

### Location: `src/components/rpg/`

### FF7Panel
Primary container for content sections.

```tsx
import { FF7Panel } from '@/components/rpg';

<FF7Panel title="Section Title" variant="default" withCorners>
  {content}
</FF7Panel>
```

**Variants**: `default`, `highlight`, `muted`

### MateriaIndicator
Diamond-shaped skill level indicators (1-5 scale).

```tsx
import { MateriaIndicator } from '@/components/rpg';

<MateriaIndicator filled={3} total={5} size="md" color="primary" />
```

**Sizes**: `sm`, `md`, `lg`
**Colors**: `primary`, `gold`, `blue`

### AttributeBar
RPG-style stat display with segmented progress.

```tsx
import { AttributeBar } from '@/components/rpg';

<AttributeBar 
  abbr="STR" 
  label="Strength" 
  value={78} 
  color="primary" 
/>
```

**Colors**: `primary`, `gold`, `blue`, `red`

### SectionHeader
Uppercase, tracked text with green left border.

```tsx
import { SectionHeader } from '@/components/rpg';

<SectionHeader>Skills & Expertise</SectionHeader>
```

### EquipmentSlot
Display active skill/focus areas with materia.

```tsx
import { EquipmentSlot } from '@/components/rpg';

<EquipmentSlot 
  name="Cloud Architecture" 
  description="Expert • 5 years"
  materiaFilled={4}
  isActive={true}
/>
```

---

## 4. Utility Classes

Defined in `src/index.css`:

| Class | Purpose |
|-------|---------|
| `.ff7-panel` | Glass panel with green glow border |
| `.ff7-header` | Section headers with left border |
| `.text-glow` | Subtle text glow effect |
| `.text-glow-strong` | Intense text glow effect |
| `.hover-lift` | Interactive hover animation |
| `.bg-grid` | Subtle grid background pattern |
| `.progress-segmented` | RPG-style segmented progress bar |
| `.focus-glow` | Focus ring with glow effect |
| `.materia-slot` | Diamond-shaped indicator base |
| `.stat-abbr` | Monospace abbreviation styling |
| `.stat-value` | Monospace value styling |

---

## 5. Animations

Defined in `tailwind.config.ts`:

| Animation | Usage |
|-----------|-------|
| `animate-fade-in` | Entry fade with upward movement |
| `animate-slide-in` | Entry slide from left |
| `animate-pulse-glow` | Subtle pulsing glow (2s infinite) |
| `animate-slide-in-up` | Entry from bottom (0.4s) |
| `animate-shimmer` | Loading skeleton effect |
| `animate-scale-up` | Emphasis scale animation |

---

## 6. Box Shadows

| Shadow | Usage |
|--------|-------|
| `shadow-glow` | Standard green glow |
| `shadow-glow-strong` | Intense green glow |
| `shadow-inner-glow` | Inset glow effect |
| `shadow-glow-gold` | Gold accent glow |

---

## 7. Accessibility

- **Contrast Ratios**: All text meets WCAG AA (4.5:1 for body)
- **Focus States**: Visible focus rings with glow effect
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Keyboard Navigation**: All interactive elements focusable
- **Screen Readers**: Proper aria-labels on decorative elements

---

## 8. Usage Examples

### Creating a Skills Section

```tsx
import { FF7Panel, SectionHeader, AttributeBar, MateriaIndicator } from '@/components/rpg';

<FF7Panel title="Skills" withCorners>
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-sm uppercase tracking-wider text-muted-foreground">
      Technical Skills
    </h4>
    <MateriaIndicator filled={4} size="sm" />
  </div>
  
  <div className="space-y-3">
    <AttributeBar abbr="AWS" label="Amazon Web Services" value={85} />
    <AttributeBar abbr="K8S" label="Kubernetes" value={78} color="blue" />
    <AttributeBar abbr="TER" label="Terraform" value={92} color="gold" />
  </div>
</FF7Panel>
```

### Creating a Hero with Effects

```tsx
<div className="min-h-screen bg-grid relative">
  <h1 className="text-7xl font-bold text-glow-strong">
    Title Here
  </h1>
  
  <button className="button-primary">
    Get Started
  </button>
  
  {/* Radial gradient overlay */}
  <div 
    className="absolute inset-0 -z-10"
    style={{
      background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%)'
    }}
  />
</div>
```

---

## 9. File Structure

```
src/
├── index.css                    # Design tokens + utility classes
├── components/
│   └── rpg/
│       ├── index.ts             # Barrel export
│       ├── FF7Panel.tsx         # Panel container
│       ├── SectionHeader.tsx    # Section headers
│       ├── MateriaIndicator.tsx # Skill level diamonds
│       ├── AttributeBar.tsx     # RPG stat bars
│       └── EquipmentSlot.tsx    # Skill/focus slots
└── styles/
    └── DESIGN_SYSTEM.md         # This documentation
```
