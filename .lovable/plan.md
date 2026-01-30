
# Carousel Alignment & Purple Color Refactor Plan

## Overview

This plan addresses two main requests:
1. **Fix carousel width/alignment** for perfect desktop and mobile experiences
2. **Refactor color scheme** from Matrix green to a sophisticated purple/black aesthetic

---

## Part 1: Carousel Alignment Issues

### Current Problems Identified

**Highlights Carousel (`Highlights.tsx`):**
- Uses `-ml-2 md:-ml-4` offset that may cause misalignment
- `basis-full md:basis-1/2 lg:basis-1/2` shows 2 items on desktop but could be better aligned
- Cards don't fill container width evenly

**Projects Carousel (`Projects.tsx`):**
- `basis-full md:basis-1/2` combined with `p-2` padding creates uneven spacing
- No explicit gap management between slides

**Apps Carousel (`Apps.tsx`):**
- `basis-full md:basis-1/3 lg:basis-1/4` on small cards
- Same offset/padding issues

**Base Carousel Component (`carousel.tsx`):**
- Uses `-ml-4` on CarouselContent and `pl-4` on CarouselItem
- This offset approach can cause first/last item alignment issues

### Solution: Consistent Carousel Spacing

**Strategy:** Use a consistent gap-based approach across all carousels with proper container alignment.

**Changes to `src/components/ui/carousel.tsx`:**
- Update CarouselContent to use configurable gap classes
- Remove hardcoded `-ml-4` offset, use container padding instead

**Changes to each carousel component:**
- Highlights: Show 1 on mobile, 2 on tablet/desktop with proper gaps
- Projects: Show 1 on mobile, 2 on desktop with equal card sizes
- Apps: Show 1 on mobile, 2 on tablet, 3-4 on desktop

**Responsive Breakpoints:**
```text
Mobile (<768px): Single card, full width
Tablet (768-1024px): 2 cards
Desktop (>1024px): 2-3 cards depending on carousel
```

---

## Part 2: Purple/Black Color Refactor

### Proposed Color Palette

**Current (Matrix Green):**
- Primary: `142 76% 45%` (HSL) = `#22c55e` (vibrant green)

**New (Royal Purple/Violet):**
- Primary: `270 70% 55%` (HSL) = `#9333ea` (vibrant purple)
- Or softer: `265 85% 65%` = `#a855f7` (lavender-purple)
- Alternative: `280 80% 50%` = `#a21caf` (magenta-purple)

### Purple Options for Your Consideration

| Option | HSL | Hex | Vibe |
|--------|-----|-----|------|
| **Royal Purple** | `270 70% 55%` | `#9333ea` | Deep, regal, professional |
| **Violet** | `265 85% 65%` | `#a855f7` | Softer, more approachable |
| **Magenta-Purple** | `280 80% 50%` | `#a21caf` | Bold, energetic |
| **Indigo-Purple** | `260 70% 50%` | `#7c3aed` | Tech-forward, modern |

**My recommendation:** **Royal Purple (`270 70% 55%`)** - it's professional, maintains the FF7R gaming aesthetic (think Sephiroth vibes), and provides excellent contrast on dark backgrounds.

### Files to Update

**1. `src/index.css` - Color Variables:**
```css
:root {
  /* RPG Dark Theme - Purple/Black */
  --primary: 270 70% 55%;           /* Royal Purple */
  --primary-foreground: 0 0% 100%;
  --accent-foreground: 270 70% 65%; /* Lighter purple */
  --border: 270 70% 55% / 0.2;
  --ring: 270 70% 55%;
  --success: 142 76% 45%;           /* Keep green for success states */
}

:root.light {
  --primary: 270 70% 45%;           /* Darker purple for light mode */
  --accent-foreground: 270 70% 45%;
  --border: 270 70% 45% / 0.15;
  --ring: 270 70% 45%;
}
```

**2. `tailwind.config.ts`:**
- No changes needed (uses CSS variables)

**3. `src/styles/DESIGN_SYSTEM.md`:**
- Update color documentation to reflect purple palette
- Update "Matrix-inspired" references to "Cyberpunk/RPG-inspired"

### Visual Impact

Since all components use `hsl(var(--primary))`, the color change will cascade automatically to:
- Panel borders and glows (`.ff7-panel`)
- Text highlights and accents
- Buttons and interactive elements
- Progress bars and materia indicators
- Background grid animation
- Floating particles

---

## Implementation Summary

### Files to Modify (6):

1. **`src/index.css`**
   - Update primary color from green to purple (both themes)
   - Update related accent colors

2. **`src/components/ui/carousel.tsx`**
   - Improve gap/spacing handling
   - Better container alignment

3. **`src/components/Highlights.tsx`**
   - Fix carousel item basis/padding for perfect alignment
   - Ensure consistent card widths

4. **`src/components/Projects.tsx`**
   - Fix carousel spacing and alignment
   - Ensure cards fill space evenly

5. **`src/components/Apps.tsx`**
   - Fix carousel spacing and alignment
   - Better responsive breakpoints

6. **`src/styles/DESIGN_SYSTEM.md`**
   - Update color documentation
   - Update design philosophy references

---

## Technical Details

### Carousel Alignment Fix

**Before (Current):**
```tsx
// CarouselContent
className="-ml-4"

// CarouselItem  
className="pl-4 basis-full md:basis-1/2"
```

**After (Fixed):**
```tsx
// CarouselContent - remove negative margin, add gap
className="gap-4"

// CarouselItem - remove padding, use flex-basis only
className="basis-full md:basis-[calc(50%-0.5rem)] lg:basis-[calc(50%-0.5rem)]"
```

### Color Change CSS

**Dark Theme Primary:**
```css
--primary: 270 70% 55%;  /* Purple */
```

**Light Theme Primary:**
```css
--primary: 270 70% 45%;  /* Darker purple for contrast */
```

---

## Before/After Preview

### Current (Green Theme):
- Primary color: Vibrant Matrix green (#22c55e)
- Panel borders: Green glow
- Text accents: Green highlights

### After (Purple Theme):
- Primary color: Royal purple (#9333ea)
- Panel borders: Purple glow
- Text accents: Purple highlights
- Same FF7R aesthetic, different color personality

---

## Preserved Elements

Everything else stays the same:
- FF7R panel styling and glassmorphism
- Animation system (pulse-glow, float, transitions)
- Sound effects system
- Theme toggle functionality
- All content and structure
- Materia indicators and progress bars (will use purple)
- Gold accent color for achievements

