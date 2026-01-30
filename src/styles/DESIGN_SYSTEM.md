# RPG UI Design System
## FF7R-Inspired Gaming Interface Language

**Purpose**: A portable design system specification for the portfolio that enables consistent FF7R/Cyberpunk-inspired aesthetics.

**Last Updated**: January 2026

---

## 1. Design Philosophy

### Core Inspiration
- **Final Fantasy VII Remake**: Status screens, materia slots, equipment panels
- **Cyberpunk Aesthetic**: Royal purple on black, neon glows, futuristic vibes
- **Modern Gaming UIs**: Duolingo gamification, progression systems

### Target Emotions
- **Power**: "I am growing stronger"
- **Mastery**: "I understand this system"
- **Immersion**: "This feels like a game, not homework"

---

## 2. Color System (HSL)

All colors are defined in `src/index.css` as CSS variables.

### Dark Theme (Default)
```css
:root {
  /* Primary: Royal Purple */
  --primary: 270 70% 55%;
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
  
  /* Accent: Lighter purple */
  --accent-foreground: 270 70% 65%;
  
  /* Extended Palette */
  --gold: 45 93% 47%;
  --warning: 38 92% 50%;
  --success: 142 76% 45%;  /* Keep green for success states */
  --destructive: 0 72% 51%;
}
```

### Light Theme
```css
:root.light {
  --background: 0 0% 98%;
  --foreground: 0 0% 10%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 10%;
  --primary: 270 70% 45%; /* Darker purple for contrast */
  --accent-foreground: 270 70% 45%;
  --muted: 0 0% 92%;
  --muted-foreground: 0 0% 40%;
  --border: 270 70% 45% / 0.15;
  --gold: 45 93% 40%;
}
```

### Theme Toggle
- Location: Sidebar (bottom area)
- Icons: Sun (for light mode) / Moon (for dark mode)
- Persisted: localStorage key `theme`
- Context: `src/contexts/ThemeContext.tsx`

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

## 4. New Components

### Highlights Carousel
Location: `src/components/Highlights.tsx`

Auto-rotating carousel showcasing LinkedIn posts, achievements, and events.

Features:
- 5-second autoplay with pause on hover
- Fade + slide transitions
- Pagination dots
- Ken Burns zoom on images

### PageLoader
Location: `src/components/PageLoader.tsx`

Materia-style spinning diamond loader for page transitions.

### PageTransition
Location: `src/components/PageTransition.tsx`

Fade wrapper for route changes with smooth opacity transitions.

### FloatingParticles
Location: `src/components/FloatingParticles.tsx`

CSS-only floating particle effect for background ambiance.

### ThemeToggle
Location: `src/components/ThemeToggle.tsx`

Toggle button for switching between dark/light themes.

### SoundToggle
Location: `src/components/SoundToggle.tsx`

Toggle button for enabling/disabling UI sounds.

---

## 5. Utility Classes

Defined in `src/index.css`:

| Class | Purpose |
|-------|---------|
| `.ff7-panel` | Glass panel with green glow border |
| `.ff7-header` | Section headers with left border |
| `.text-glow` | Subtle text glow effect |
| `.text-glow-strong` | Intense text glow effect |
| `.hover-lift` | Interactive hover animation |
| `.bg-grid` | Subtle grid background pattern |
| `.bg-grid-animated` | Animated grid with pulsing effect |
| `.progress-segmented` | RPG-style segmented progress bar |
| `.focus-glow` | Focus ring with glow effect |
| `.materia-slot` | Diamond-shaped indicator base |
| `.stat-abbr` | Monospace abbreviation styling |
| `.stat-value` | Monospace value styling |
| `.particle` | Floating particle styling |

---

## 6. Animations

Defined in `tailwind.config.ts`:

| Animation | Usage |
|-----------|-------|
| `animate-fade-in` | Entry fade with upward movement |
| `animate-slide-in` | Entry slide from left |
| `animate-pulse-glow` | Subtle pulsing glow (2s infinite) |
| `animate-slide-in-up` | Entry from bottom (0.4s) |
| `animate-shimmer` | Loading skeleton effect |
| `animate-scale-up` | Emphasis scale animation |

### CSS Animations (in index.css)

| Animation | Usage |
|-----------|-------|
| `grid-pulse` | Animated grid background movement |
| `float` | Floating particle motion |

---

## 7. Box Shadows

| Shadow | Usage |
|--------|-------|
| `shadow-glow` | Standard green glow |
| `shadow-glow-strong` | Intense green glow |
| `shadow-inner-glow` | Inset glow effect |
| `shadow-glow-gold` | Gold accent glow |

---

## 8. Sound System

### Context: `src/contexts/SoundContext.tsx`

Uses Web Audio API to generate subtle UI feedback sounds.

### Available Sounds
- `playClick()` - Button/link clicks (800Hz, 50ms)
- `playToggle()` - Toggle switches (600Hz + 900Hz, 80ms)
- `playTransition()` - Page transitions (400Hz, 150ms)

### Settings
- Stored in localStorage key `sound-settings`
- Default: enabled at 30% volume
- Toggle in Sidebar

---

## 9. Icon Standards

### Guidelines
- **Library**: Lucide React only
- **No emojis** in production UI
- **Sizes**: 
  - Small (inline): `h-4 w-4`
  - Medium (buttons): `h-5 w-5`
  - Large (features): `h-6 w-6`
- **Color**: Use `text-primary` or `text-muted-foreground`

### App Icon Mapping
| App | Icon |
|-----|------|
| Sensei AI | `GraduationCap` |
| Zen Reset | `Leaf` |
| Chord Genesis | `Music` |
| Wolf AI | `Bot` |
| Voice Assistant | `Mic` |
| Cloud LLM | `BrainCircuit` |
| DJ Visualizer | `Headphones` |
| FineLine | `PenLine` |
| Game Hub | `Gamepad2` |
| Sprite Gen | `Palette` |
| Knowledge Base | `BookOpen` |

---

## 10. Accessibility

- **Contrast Ratios**: All text meets WCAG AA (4.5:1 for body)
- **Focus States**: Visible focus rings with glow effect
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Keyboard Navigation**: All interactive elements focusable
- **Screen Readers**: Proper aria-labels on decorative elements
- **Theme**: Respects user preference, persists choice
- **Sound**: Respects user choice, default low volume

---

## 11. Carousel Best Practices

### Autoplay Settings
```tsx
import Autoplay from 'embla-carousel-autoplay';

plugins={[
  Autoplay({
    delay: 5000,           // 5 seconds
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  }),
]}
```

### Pagination Dots
```tsx
<div className="flex justify-center gap-2 mb-6">
  {Array.from({ length: count }).map((_, index) => (
    <button
      key={index}
      onClick={() => scrollTo(index)}
      className={`w-2 h-2 rounded-full transition-all duration-300 ${
        index === current 
          ? 'w-6 bg-primary' 
          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
      }`}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>
```

---

## 12. File Structure

```
src/
├── index.css                    # Design tokens + utility classes
├── contexts/
│   ├── ThemeContext.tsx         # Theme state management
│   └── SoundContext.tsx         # Sound settings management
├── components/
│   ├── ThemeToggle.tsx          # Theme toggle button
│   ├── SoundToggle.tsx          # Sound toggle button
│   ├── PageLoader.tsx           # Loading spinner
│   ├── PageTransition.tsx       # Route transition wrapper
│   ├── FloatingParticles.tsx    # Background particles
│   ├── Highlights.tsx           # Highlights carousel
│   └── rpg/
│       ├── index.ts             # Barrel export
│       ├── FF7Panel.tsx         # Panel container
│       ├── SectionHeader.tsx    # Section headers
│       ├── MateriaIndicator.tsx # Skill level diamonds
│       ├── AttributeBar.tsx     # RPG stat bars
│       └── EquipmentSlot.tsx    # Skill/focus slots
├── data/
│   └── highlights.ts            # Highlights data
└── styles/
    └── DESIGN_SYSTEM.md         # This documentation
```

---

## 13. Performance Considerations

- **Animations**: CSS-only where possible (grid-pulse, float)
- **Particles**: Limited to 12 elements with GPU-accelerated transforms
- **Sound**: Web Audio API (no external files needed)
- **Images**: Lazy loading on all carousel images
- **Reduced Motion**: All animations respect system preference
- **Theme Transition**: 300ms transition on body for smooth theme changes
