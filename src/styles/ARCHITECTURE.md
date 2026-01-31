# Portfolio Architecture Documentation
## Complete Technical Reference for AI Agent Recreation

---

## Related Documentation

- `DESIGN_SYSTEM.md` - Visual design tokens, colors, components
- `ARCHITECTURE.md` - Technical architecture (this file)
- `CHANGELOG.md` - Development history and session changes

---

## 1. PROJECT OVERVIEW

### Tech Stack
- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix primitives)
- **Routing**: React Router DOM v6
- **State Management**: React Context API (3 contexts)
- **Animations**: CSS transitions + Tailwind animate

### Key Dependencies
```json
{
  "react-router-dom": "^6.26.2",
  "lucide-react": "^0.462.0",
  "tailwindcss-animate": "^1.0.7",
  "embla-carousel-react": "^8.3.0",
  "@radix-ui/*": "Various Radix primitives for shadcn"
}
```

### File Structure
```
src/
├── components/
│   ├── rpg/           # FF7-inspired UI components
│   │   ├── FF7Panel.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── MateriaIndicator.tsx
│   │   ├── AttributeBar.tsx
│   │   └── EquipmentSlot.tsx
│   ├── ui/            # shadcn/ui components
│   ├── Sidebar.tsx    # Main navigation
│   ├── Footer.tsx
│   ├── PageLayout.tsx # Wrapper for all pages
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Apps.tsx       # Homepage apps carousel
│   ├── Projects.tsx
│   ├── Contact.tsx
│   ├── FloatingParticles.tsx
│   ├── ThemeToggle.tsx
│   └── SoundToggle.tsx
├── contexts/
│   ├── ThemeContext.tsx
│   ├── SoundContext.tsx
│   └── SidebarContext.tsx
├── data/
│   ├── apps.ts
│   ├── projects.ts
│   ├── blog.ts
│   ├── services.ts
│   ├── skills.ts
│   └── highlights.ts
├── pages/
│   ├── Index.tsx      # Homepage with all sections
│   ├── Apps.tsx       # Full apps collection page
│   ├── Blog.tsx
│   ├── Services.tsx
│   └── ProjectDetail.tsx
├── styles/
│   ├── DESIGN_SYSTEM.md
│   └── ARCHITECTURE.md (this file)
└── index.css          # Tailwind + custom CSS
```

---

## 2. ROUTING & NAVIGATION

### Routes Configuration (App.tsx)
```typescript
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/apps" element={<Apps />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/services" element={<Services />} />
  <Route path="/project/:id" element={<ProjectDetail />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Sidebar Navigation Array
**CRITICAL**: This exact order and structure must be maintained:

```typescript
const navLinks: NavLink[] = [
  { name: 'About', href: '#about', icon: <User size={20} /> },
  { name: 'Apps', href: '#apps', icon: <AppWindow size={20} /> },
  { name: 'Projects', href: '#projects', icon: <FolderOpen size={20} /> },
  { name: 'Services', href: '/services', icon: <Briefcase size={20} />, isRoute: true },
  { name: 'Blog', href: '/blog', icon: <FileText size={20} />, isRoute: true },
  { name: 'Contact', href: '#contact', icon: <MailIcon size={20} /> },
];
```

### Cross-Page Hash Navigation Logic
**CRITICAL**: Hash links must work from any page:

```typescript
const isHomePage = location.pathname === '/';

const getHref = () => {
  if (link.isRoute) return link.href;
  // Prefix with "/" when not on homepage so browser navigates to /#section
  return isHomePage ? link.href : `/${link.href}`;
};

// Use native <a> for hash links (cross-page compatible)
// Use <Link> for route links (SPA navigation)
return link.isRoute ? (
  <Link to={link.href} onClick={handleClick}>...</Link>
) : (
  <a href={getHref()} onClick={handleClick}>...</a>
);
```

### Social Links
```typescript
const socialLinks = [
  { name: 'GitHub', icon: <Github size={18} />, url: 'https://github.com/' },
  { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/' },
  { name: 'Twitter', icon: <Twitter size={18} />, url: 'https://twitter.com/' },
];
```

---

## 3. LAYOUT SYSTEM

### PageLayout Component Usage
All pages except Index.tsx must use PageLayout:

```typescript
// src/components/PageLayout.tsx
import Sidebar from './Sidebar';
import Footer from './Footer';
import FloatingParticles from './FloatingParticles';
import { useSidebarContext } from '@/contexts/SidebarContext';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useSidebarContext();
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-grid-animated relative overflow-x-hidden">
      <FloatingParticles />
      <Sidebar />
      <main className={`flex-1 relative z-10 transition-all duration-300 
                       ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        {children}
        <Footer />
      </main>
    </div>
  );
};
```

### Sidebar Collapse/Expand Behavior

**Desktop:**
- Expanded: `w-64` (256px) - Full sidebar with labels
- Collapsed: `w-16` (64px) - Icons only with tooltips
- Toggle button: Chevron at `absolute -right-3 top-20`
- State persisted in localStorage

**Mobile:**
- Hidden by default: `transform: translateX(-100%)`
- Menu button in fixed position: `top-4 right-4`
- Opens with `translateX(0)`

**Margin Adjustments:**
```typescript
// Main content margin based on sidebar state
className={`${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}
```

### Context Provider Setup (App.tsx)
```typescript
<TooltipProvider>
  <ThemeProvider>
    <SoundProvider>
      <SidebarProvider>
        <BrowserRouter>
          {/* Routes */}
        </BrowserRouter>
      </SidebarProvider>
    </SoundProvider>
  </ThemeProvider>
</TooltipProvider>
```

---

## 4. PAGE TEMPLATES

### Homepage (Index.tsx) Structure
```typescript
const Index = () => {
  const { isCollapsed } = useSidebarContext();
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-grid-animated relative overflow-x-hidden">
      <FloatingParticles />
      <Sidebar />
      <main className={`flex-1 relative z-10 transition-all duration-300 
                       ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <Hero />
        <Highlights />
        <About />       {/* id="about" */}
        <Apps />        {/* id="apps" - Carousel of featured apps */}
        <Projects />    {/* id="projects" */}
        <Contact />     {/* id="contact" */}
        <Footer />
      </main>
    </div>
  );
};
```

### Standalone Page Pattern (Apps, Blog, Services)
```typescript
const PageName = () => {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background ...">
        {/* Gradient background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient blobs */}
        </div>
        
        <div className="relative z-10">
          {/* Header Section */}
          <div className="container mx-auto px-4 pt-20 pb-12">
            <h1 className="text-4xl md:text-6xl font-bold ...">Title</h1>
            {/* Search/Filter controls if needed */}
          </div>
          
          {/* Content Grid */}
          <div className="container mx-auto px-4 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Items */}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
```

---

## 5. DATA LAYER

### App Interface
```typescript
export interface App {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  icon: string;           // Lucide icon name: 'GraduationCap', 'Leaf', etc.
  appUrl?: string;
  storeUrl?: string;
  githubUrl?: string;
}
```

### Project Interface
```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'cloud' | 'webhosting' | 'artcurating' | 'audioengineering' | 'domain' | 'marketing' | 'design' | 'ecommerce';
  demoUrl?: string;
  codeUrl?: string;
}
```

### BlogPost Interface
```typescript
export type BlogCategory = 'reflection' | 'technical' | 'career' | 'personal';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;           // Format: 'YYYY-MM-DD'
  category: BlogCategory;
  readingTime: string;    // e.g., '5 min read'
  url?: string;
  tags: string[];
}
```

### Service Interface
```typescript
export interface Service {
  id: string;
  title: string;
  icon: typeof Bot;       // Lucide icon component
  description: string;
  features: string[];
  pricing?: string;
  cta: string;
}
```

### Adding New Data Items
1. Add entry to appropriate data file in `src/data/`
2. For apps with icons, use Lucide icon names and add to iconMap in Apps.tsx
3. For projects, use valid category enum values
4. Images: Use ASSETS config for local or full URLs for external

---

## 6. COMPONENT CATALOG

### RPG Components (`src/components/rpg/`)

**FF7Panel** - Main container with glassmorphism
```typescript
<FF7Panel 
  title="Optional Title"           // Shows SectionHeader
  variant="default|highlight|muted"
  withCorners={true}               // Corner bracket decorations
  className="custom-classes"
>
  {children}
</FF7Panel>
```

**SectionHeader** - Styled header with left border
```typescript
<SectionHeader>SKILLS</SectionHeader>
// Renders: uppercase, tracking-widest, primary color, left border
```

**MateriaIndicator** - Diamond-shaped status indicators
```typescript
<MateriaIndicator filled={true} color="primary|gold" />
```

**AttributeBar** - Progress bar with segments
```typescript
<AttributeBar label="STR" value={85} max={100} />
```

### Layout Components

**Sidebar** - Full navigation with collapse
- Uses: SidebarContext, SoundContext, useLocation
- Features: Active section highlighting, tooltips, sound effects

**Footer** - Simple copyright footer

**PageLayout** - Wrapper providing sidebar + footer + particles

### Animation Components

**FloatingParticles** - Animated background particles
```typescript
// Renders 15 particles with random positions and delays
<div className="particle" style={{
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  width: `${Math.random() * 4 + 2}px`,
  height: `${Math.random() * 4 + 2}px`,
  '--duration': `${Math.random() * 20 + 15}s`,
  animationDelay: `${Math.random() * 10}s`,
}} />
```

**PageLoader** - Loading spinner (spinning materia style)

---

## 7. CONTEXT PROVIDERS

### ThemeContext
```typescript
interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Usage:
const { theme, toggleTheme } = useTheme();

// Persistence: localStorage key 'theme'
// DOM: document.documentElement.classList.add/remove('light')
```

### SoundContext
```typescript
interface SoundContextType {
  settings: { enabled: boolean; volume: number };
  setSettings: (settings: SoundSettings) => void;
  toggleSound: () => void;
  playClick: () => void;      // 800Hz, 0.05s - for nav clicks
  playToggle: () => void;     // 600Hz + 900Hz - for toggles
  playTransition: () => void; // 400Hz, 0.15s - for page transitions
}

// Usage:
const { playClick, playToggle } = useSound();

// Persistence: localStorage key 'sound-settings'
// Default: { enabled: true, volume: 0.3 }
```

### SidebarContext
```typescript
interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

// Usage:
const { isCollapsed, toggleCollapse } = useSidebarContext();

// Persistence: localStorage key 'sidebar-collapsed'
// Default: false (expanded)
```

---

## 8. STYLING SYSTEM

### CSS Variables (index.css :root)

**Dark Theme (Default):**
```css
:root {
  --background: 0 0% 3%;           /* Near black */
  --foreground: 0 0% 98%;          /* Near white */
  --card: 0 0% 6%;                 /* Elevated black */
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 6%;
  --popover-foreground: 0 0% 98%;
  --primary: 270 70% 55%;          /* Royal Purple */
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 10%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 12%;
  --muted-foreground: 0 0% 60%;
  --accent: 0 0% 12%;
  --accent-foreground: 270 70% 65%;
  --destructive: 0 72% 51%;
  --border: 270 70% 55% / 0.2;     /* Primary with opacity */
  --input: 0 0% 10%;
  --ring: 270 70% 55%;
  --radius: 0.75rem;
  
  /* Extended */
  --gold: 45 93% 47%;
  --warning: 38 92% 50%;
  --success: 142 76% 45%;
}
```

**Light Theme (`:root.light`):**
```css
:root.light {
  --background: 0 0% 98%;
  --foreground: 0 0% 10%;
  --card: 0 0% 100%;
  --primary: 270 70% 45%;          /* Slightly darker purple */
  /* ... other light variants */
}
```

### Key Utility Classes

**Panels:**
```css
.ff7-panel          /* Default panel with glow */
.ff7-panel-highlight /* Stronger glow */
.ff7-panel-muted    /* Subdued appearance */
```

**Text Effects:**
```css
.text-glow          /* Primary color shadow */
.text-glow-strong   /* Double-layer glow */
```

**Backgrounds:**
```css
.bg-grid            /* Static grid pattern */
.bg-grid-animated   /* Animated grid with pulse */
```

**Interactions:**
```css
.hover-lift         /* Translate-y + shadow on hover */
.focus-glow         /* Glowing focus ring */
```

**Progress/Status:**
```css
.materia-slot       /* Diamond shape base */
.materia-slot-filled /* Filled with primary glow */
.materia-slot-gold  /* Gold variant */
```

### Animation Keyframes
```css
@keyframes grid-pulse { /* Grid background animation */ }
@keyframes float { /* Particle floating motion */ }
```

---

## 9. SOUND SYSTEM

### Available Sounds
| Function | Frequency | Duration | Use Case |
|----------|-----------|----------|----------|
| `playClick()` | 800Hz | 0.05s | Nav links, buttons |
| `playToggle()` | 600Hz→900Hz | 0.08s×2 | Theme, sidebar, switches |
| `playTransition()` | 400Hz | 0.15s | Page transitions |

### Adding Sounds to Interactions
```typescript
// Import hook
import { useSound } from '@/contexts/SoundContext';

// In component
const { playClick, playToggle } = useSound();

// Wire to events
<button onClick={() => { playClick(); doAction(); }}>
<Switch onCheckedChange={() => { playToggle(); toggle(); }}>
```

### Currently Wired Locations
- Sidebar nav links: `playClick()`
- Sidebar collapse toggle: `playToggle()`
- Theme toggle: `playToggle()`
- Social link clicks: `playClick()`
- Sound toggle itself: `playToggle()`

---

## 10. BEST PRACTICES

### Adding a New Page
1. Create `src/pages/NewPage.tsx`
2. Wrap content in `<PageLayout>...</PageLayout>`
3. Add route in `App.tsx`
4. Add to navLinks in `Sidebar.tsx` with `isRoute: true`
5. Use appropriate icon from Lucide

### Adding a New Homepage Section
1. Create `src/components/NewSection.tsx`
2. Add `id="newsection"` to root `<section>` element
3. Import and place in `Index.tsx` in desired order
4. Add nav link in `Sidebar.tsx` (hash link, no isRoute)

### Adding Navigation Items
```typescript
// For hash links (homepage sections):
{ name: 'NewSection', href: '#newsection', icon: <IconName size={20} /> }

// For route links (separate pages):
{ name: 'NewPage', href: '/newpage', icon: <IconName size={20} />, isRoute: true }
```

### Icon Usage
- **ALWAYS** use Lucide React icons
- **NEVER** use emojis for UI elements
- Import only needed icons to minimize bundle size
- Standard size: `size={20}` for nav, `size={18}` for smaller contexts

### Color Usage
- **NEVER** use direct colors like `text-white`, `bg-purple-500`
- **ALWAYS** use semantic tokens: `text-foreground`, `bg-primary`, `text-muted-foreground`
- For custom colors, add to CSS variables first, then tailwind.config.ts

### Accessibility
- All interactive elements need focus states
- Use `aria-label` for icon-only buttons
- Maintain proper heading hierarchy (single H1 per page)
- Support reduced motion preference

---

## QUICK REFERENCE

### Essential Files to Modify
| Task | File(s) |
|------|---------|
| Add nav item | `src/components/Sidebar.tsx` |
| Change colors | `src/index.css` + `tailwind.config.ts` |
| Add homepage section | `src/components/NewSection.tsx` + `src/pages/Index.tsx` |
| Add new page | `src/pages/NewPage.tsx` + `src/App.tsx` |
| Add data items | `src/data/*.ts` |

### Context Hooks
```typescript
import { useTheme } from '@/contexts/ThemeContext';
import { useSound } from '@/contexts/SoundContext';
import { useSidebarContext } from '@/contexts/SidebarContext';
```

### Component Imports
```typescript
// RPG Components
import { FF7Panel, SectionHeader, MateriaIndicator } from '@/components/rpg';

// Layout
import PageLayout from '@/components/PageLayout';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

// UI (shadcn)
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
```
