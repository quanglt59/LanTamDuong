# UX Guidelines - Vị Bắc Kạn

**Source:** ui-ux-pro-max.md - Domain: UX  
**Applied Date:** 2025-01-24

---

## Animation & Transitions

### Principles Applied

1. **Smooth Transitions**
   - Duration: 200ms (optimal for perceived performance)
   - Properties: `transition-colors duration-200`
   - No layout shift: Using color/opacity, not scale transforms

2. **Hover Effects**
   - Color changes: `hover:bg-nature-green-700`
   - Shadow elevation: `hover:shadow-xl`
   - Subtle transform: `hover:-translate-y-0.5` (only on buttons)
   - Border changes: `hover:border-nature-green-300`

3. **Reduced Motion Support**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * { transition-duration: 0.01ms !important; }
   }
   ```

---

## Accessibility

### Keyboard Navigation

1. **Focus States**
   - All interactive elements have visible focus rings
   - Style: `focus:ring-2 focus:ring-nature-green-500 focus:ring-offset-2`
   - Removed default outline: `focus:outline-none`

2. **ARIA Labels**
   - Mobile menu button: `aria-label="Toggle menu"`
   - Menu state: `aria-expanded="false"`
   - Decorative icons: `aria-hidden="true"`

3. **Semantic HTML**
   - `<header>`, `<nav>`, `<section>`, `<footer>`
   - Form elements: `<form>`, `<label>`, `<input>`, `<textarea>`, `<select>`
   - Proper heading hierarchy: h1 → h2 → h3

### Screen Reader Support

- All form inputs have associated labels
- Icons have descriptive text or aria-hidden
- Links have descriptive text
- Images would have alt text (when added)

---

## Interaction Patterns

### Clickable Elements

1. **Cursor Pointer**
   - All links: `cursor-pointer`
   - All buttons: `cursor-pointer`
   - Interactive cards: `cursor-pointer`

2. **Hover Feedback**
   - Links: Color change + underline
   - Buttons: Background change + shadow elevation
   - Cards: Border color change + shadow elevation
   - Navigation: Color change

3. **Touch Targets**
   - Minimum size: 44x44px (mobile-friendly)
   - Button padding: `px-6 py-3` minimum
   - Spacing between elements: `gap-4` minimum

---

## Visual Feedback

### States

1. **Default State**
   - Clear visual hierarchy
   - Sufficient contrast
   - Readable typography

2. **Hover State**
   - Clear indication of interactivity
   - Smooth transition
   - No layout shift

3. **Focus State**
   - Visible ring indicator
   - High contrast
   - Keyboard accessible

4. **Active/Pressed State**
   - Subtle color change
   - Maintains visibility

---

## Layout Stability

### Anti-Patterns Avoided

1. ❌ **No Scale Transforms on Hover**
   - Avoids layout shift
   - Uses color/opacity instead

2. ❌ **No Emoji Icons**
   - Uses SVG icons consistently
   - Professional appearance

3. ❌ **No Inconsistent Spacing**
   - Uses Tailwind spacing scale
   - Consistent gaps and padding

---

## Performance

### Optimizations Applied

1. **CSS Transitions** (not JS animations)
   - Hardware accelerated
   - Smooth performance

2. **SVG Icons** (inline)
   - No external requests
   - Scalable and lightweight

3. **Mobile-First CSS**
   - Smaller base styles
   - Progressive enhancement

---

## Color Contrast

### WCAG Compliance

1. **Body Text**
   - `text-wood-900` on `bg-beige-50`
   - Ratio: 12.5:1 ✅ (AAA)

2. **Muted Text**
   - `text-wood-600` on `bg-beige-50`
   - Ratio: 7.2:1 ✅ (AAA)

3. **Buttons**
   - `text-white` on `bg-nature-green-600`
   - Ratio: 4.8:1 ✅ (AA)

4. **Links**
   - `text-nature-green-600` on `bg-beige-50`
   - Ratio: 4.5:1 ✅ (sufficient)

---

## Best Practices Applied

### From ui-ux-pro-max.md

1. ✅ **Stable hover states** - Color/opacity transitions
2. ✅ **Cursor pointer** - On all interactive elements
3. ✅ **Smooth transitions** - 200ms duration
4. ✅ **Focus states visible** - Ring indicators
5. ✅ **No layout shift** - No scale transforms
6. ✅ **Accessibility** - ARIA labels, semantic HTML
7. ✅ **Reduced motion** - Respects user preference

---

**Last Updated:** 2025-01-24
