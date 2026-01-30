
# Carousel & Sidebar Fixes Plan
## Fixing Cut-off Issues and UI Polish

---

## Issues Identified from Screenshots

### 1. Highlights Carousel Problems
Looking at your screenshot, the highlights carousel has several issues:
- **Left card cut-off**: The first card on the left is partially visible/clipped
- **Right card cut-off**: Same issue on the right side
- **Cards not aligned to container edges**: Unlike Apps carousel which aligns perfectly

**Root Cause**: The Highlights carousel uses `align: 'center'` which shows partial cards at edges. The Apps carousel uses `align: 'start'` which keeps cards within bounds.

### 2. Sidebar Cut-off
The sidebar shows a thin sliver visible on mobile when it should be completely hidden.

**Root Cause**: The `-left-full` positioning doesn't fully hide the 64px (w-16) sidebar, causing a visible edge.

---

## Solution 1: Fix Highlights Carousel

### Changes to `src/components/Highlights.tsx`:

**Problem**: Using `align: 'center'` + `basis-[calc(50%-0.5rem)]` causes clipping

**Fix**:
1. Change from `align: 'center'` to `align: 'start'` to match Apps carousel behavior
2. Update responsive breakpoints to match Apps pattern
3. Add proper container padding to prevent edge clipping
4. Ensure cards fill container properly without overflow

```text
Current (Broken):
- opts={{ align: 'center', loop: true }}
- className="basis-full md:basis-[calc(50%-0.5rem)]"

Fixed (Like Apps):
- opts={{ align: 'start', loop: true, skipSnaps: false, dragFree: false }}
- className="basis-full md:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.667rem)]"
- Add overflow-hidden to container
```

**Additional Fixes**:
- Add `overflow-hidden` class to the Carousel wrapper
- Ensure the container has proper padding that matches card gaps
- Show 1 card mobile, 2 cards tablet, 3 cards desktop (like a middle ground)

---

## Solution 2: Fix Sidebar Cut-off

### Changes to `src/components/Sidebar.tsx`:

**Problem**: `-left-full` doesn't fully hide a `w-16` element

**Fix**: Use more aggressive hiding with transform or proper left calculation

```text
Current (Shows sliver):
className="w-16 md:w-64 ${isOpen ? 'left-0' : '-left-full md:left-0'}"

Fixed Options:
Option A: Use transform instead
className="w-16 md:w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}"

Option B: Calculate proper left offset  
className="w-16 md:w-64 ${isOpen ? 'left-0' : '-left-16 md:left-0'}"
```

**Recommended**: Option A (transform-based) is smoother and more reliable.

---

## Solution 3: Additional Improvements

### 3a. Main Content Mobile Offset
The main content needs to account for sidebar properly:

```text
Current in Index.tsx:
<main className="flex-1 md:ml-64 relative z-10">

Issue: On mobile, when sidebar is hidden, main should have ml-0
Fix: Already correct with md: prefix, but verify no overflow
```

### 3b. Improve Highlights Card Styling
Match the Apps cards more closely:
- Ensure consistent padding inside FF7Panel
- Add min-height to prevent inconsistent card heights
- Improve image aspect ratio handling

### 3c. Carousel Navigation Buttons
Currently buttons use `static` positioning which works, but could add padding around carousel to prevent edge clipping.

---

## Files to Modify

### 1. `src/components/Highlights.tsx`
- Change carousel alignment from 'center' to 'start'
- Update responsive basis classes
- Add container padding/overflow handling
- Improve card layout consistency

### 2. `src/components/Sidebar.tsx`
- Switch from `left-*` positioning to `translate-x` for mobile hide/show
- Ensure proper z-index to prevent bleed-through

### 3. `src/pages/Index.tsx` (minor)
- Add overflow-hidden to main content wrapper if needed

---

## Technical Implementation Details

### Highlights Carousel Fix

```text
Before:
<Carousel
  opts={{
    align: 'center',  // Causes clipping
    loop: true,
  }}
  ...
>
  <CarouselContent>
    <CarouselItem className="basis-full md:basis-[calc(50%-0.5rem)]">

After:
<Carousel
  opts={{
    align: 'start',   // Keeps cards in bounds
    loop: true,
    skipSnaps: false,
    dragFree: false,
  }}
  ...
>
  <CarouselContent className="-ml-4">  // Offset for gaps
    <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
```

The key insight: The Apps carousel works because:
1. Uses `align: 'start'` not `center`
2. Has proper responsive breakpoints
3. Container and items have matching gap/padding

### Sidebar Transform Fix

```text
Before:
className={`... ${isOpen ? 'left-0' : '-left-full md:left-0'}`}

After:
className={`... left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
```

Using `translate-x` instead of `left` provides:
- Hardware-accelerated animation
- Precise element hiding (no partial visibility)
- Smoother transitions

---

## Summary of Changes

| File | Change | Purpose |
|------|--------|---------|
| `Highlights.tsx` | Change align to 'start', update basis classes | Fix card clipping |
| `Highlights.tsx` | Add proper gap handling with -ml-4 / pl-4 pattern | Match Apps carousel |
| `Sidebar.tsx` | Use translate-x instead of left positioning | Fix mobile cutoff |
| `Index.tsx` | Add overflow-x-hidden if needed | Prevent horizontal scroll |

---

## Expected Results

After implementation:
- **Highlights carousel**: Cards align perfectly within container bounds, no clipping on edges
- **Sidebar**: Completely hidden on mobile when closed, no visible sliver
- **Consistent UX**: Highlights will behave like Apps carousel (which you said looks great)
- **Mobile**: Clean full-width cards with smooth navigation
- **Desktop**: 2-3 cards visible with proper spacing between them
