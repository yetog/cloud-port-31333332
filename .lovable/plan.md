

# Services Page Enhancement Plan
## Remove Pricing, Fix Contact Links, Add Partners Section

---

## Changes Overview

### 1. Remove Pricing Display
**File: `src/data/services.ts`**
- Remove the `pricing` field from all service objects
- Keep the interface but make it optional (already is)

**File: `src/pages/Services.tsx`**
- Remove the pricing display block (lines 40-44)

### 2. Fix All Links to Contact Form
**Current Issue:** Service card links use `href="#contact"` which won't work from `/services` page

**Fix in `src/pages/Services.tsx`:**
- Change `href="#contact"` to `href="/#contact"` on service cards (line 62)
- The CTA section already uses `href="/#contact"` correctly

### 3. Add Partners & Affiliates Section
**New section between Services Grid and CTA**

**Partners to Include:**
| Partner | Logo | Link/Code |
|---------|------|-----------|
| IONOS | Logo needed | Partner link |
| AWS | AWS logo | Partner link |
| ElevenLabs | 11Labs logo | https://try.elevenlabs.io/4eohur6ossid |
| Lovable | Lovable logo | Partner link |
| Gamma | Gamma logo | Partner link |
| Leonardo | Leonardo AI logo | Partner link |
| Oakcha | Oakcha logo | Code: ISAYAH90460 |

**Design:**
- Horizontal scrolling logo bar on mobile
- Grid layout on desktop (3-4 columns)
- Subtle hover effects (lift + glow)
- Partner logos in grayscale, color on hover
- Affiliate codes displayed subtly where applicable

---

## Implementation Details

### Updated Service Interface
```typescript
export interface Service {
  id: string;
  title: string;
  icon: typeof Bot;
  description: string;
  features: string[];
  cta: string;
  // pricing removed
}
```

### Partners Data Structure
```typescript
// New file: src/data/partners.ts
export interface Partner {
  id: string;
  name: string;
  logo: string;        // Path to logo image
  url?: string;        // Partner/affiliate link
  code?: string;       // Affiliate code if applicable
  type: 'partner' | 'affiliate';
}

export const partners: Partner[] = [
  { id: 'ionos', name: 'IONOS', logo: '/partners/ionos.svg', type: 'partner' },
  { id: 'aws', name: 'AWS', logo: '/partners/aws.svg', type: 'partner' },
  { id: 'elevenlabs', name: 'ElevenLabs', logo: '/partners/elevenlabs.svg', url: 'https://try.elevenlabs.io/4eohur6ossid', type: 'affiliate' },
  { id: 'lovable', name: 'Lovable', logo: '/partners/lovable.svg', type: 'partner' },
  { id: 'gamma', name: 'Gamma', logo: '/partners/gamma.svg', type: 'partner' },
  { id: 'leonardo', name: 'Leonardo AI', logo: '/partners/leonardo.svg', type: 'partner' },
  { id: 'oakcha', name: 'Oakcha', logo: '/partners/oakcha.svg', code: 'ISAYAH90460', type: 'affiliate' },
];
```

### Partners Section UI
```text
{/* Partners & Affiliates Section */}
<section className="py-16 px-4">
  <div className="container mx-auto max-w-6xl">
    <FF7Panel className="p-8" withCorners>
      <SectionHeader>Partners & Affiliates</SectionHeader>
      <p className="text-muted-foreground text-center mb-8">
        Trusted partnerships that power exceptional solutions
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
        {partners.map((partner) => (
          <a 
            key={partner.id}
            href={partner.url || '#'}
            className="group flex flex-col items-center p-4 rounded-lg 
                       hover:bg-primary/10 transition-all"
          >
            <img 
              src={partner.logo} 
              alt={partner.name}
              className="h-12 w-auto grayscale opacity-60 
                         group-hover:grayscale-0 group-hover:opacity-100 
                         transition-all"
            />
            {partner.code && (
              <span className="text-xs text-muted-foreground mt-2">
                Code: {partner.code}
              </span>
            )}
          </a>
        ))}
      </div>
    </FF7Panel>
  </div>
</section>
```

---

## Files to Modify/Create

### 1. Modify: `src/data/services.ts`
- Remove all `pricing` fields from service objects

### 2. Modify: `src/pages/Services.tsx`
- Remove pricing display block
- Fix contact link from `#contact` to `/#contact`
- Add Partners section before CTA

### 3. Create: `src/data/partners.ts`
- Partner/affiliate data with logos and links

### 4. Add Logo Files
- Need placeholder or actual logos in `public/partners/`
- Can use placeholder images initially, replace with real logos later

---

## Page Structure After Changes

```text
Services Page Layout:
├── Hero Section (title + description)
├── Services Grid (4 cards, no pricing, links to /#contact)
├── Partners & Affiliates Section (NEW)
│   └── Logo grid with hover effects
└── CTA Section ("Ready to Get Started?")
```

---

## Logo Placeholder Strategy

Since you provided partner names but not all logos, I can:
1. Use text-based placeholders initially (partner name in a styled box)
2. Add a note for you to upload actual logo files later
3. Use a generic placeholder image that's easy to swap

The component will be built to gracefully handle missing images.

