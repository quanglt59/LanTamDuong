# Stack Guidelines - React + Tailwind CSS

**Source:** ui-ux-pro-max.md - Stack: React  
**Applied Date:** 2025-01-24

---

## React Best Practices

### Component Architecture

1. **Functional Components**
   ```jsx
   export default function ComponentName() {
     // Component logic
   }
   ```

2. **Hooks Usage**
   - `useState` for form state management
   - No unnecessary re-renders
   - Clean component structure

3. **Props Pattern**
   - Props for component communication
   - Default props where appropriate
   - Destructuring for clarity

### State Management

1. **Local State**
   - Form data: `useState` in OrderForm
   - Component-specific state only

2. **No Global State Needed**
   - Simple landing page
   - No complex state sharing

### Performance

1. **Component Structure**
   - Small, focused components
   - Single responsibility
   - Easy to maintain

2. **No Unnecessary Re-renders**
   - Proper state management
   - No prop drilling

---

## Tailwind CSS Best Practices

### Configuration

1. **Custom Colors**
   ```js
   colors: {
     nature: { green: { ... } },
     earth: { ... },
     wood: { ... },
     beige: { ... }
   }
   ```

2. **Custom Fonts**
   ```js
   fontFamily: {
     sans: ['Inter', 'system-ui', 'sans-serif'],
     serif: ['Playfair Display', 'Georgia', 'serif']
   }
   ```

### Utility Classes

1. **Responsive Design**
   - Mobile-first: Base styles
   - Breakpoints: `sm:`, `md:`, `lg:`, `xl:`

2. **Spacing System**
   - Consistent: 4, 6, 8, 12, 16, 20, 24
   - Padding: `p-4`, `p-6`, `p-8`
   - Gaps: `gap-4`, `gap-6`, `gap-8`

3. **Typography**
   - Responsive sizes: `text-sm sm:text-base lg:text-lg`
   - Font weights: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
   - Line heights: `leading-tight`, `leading-relaxed`

### Layout Patterns

1. **Container**
   ```jsx
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   ```

2. **Grid System**
   ```jsx
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
   ```

3. **Flexbox**
   ```jsx
   <div className="flex flex-col sm:flex-row gap-4">
   ```

---

## Responsive Patterns

### Breakpoints

1. **Phone (< 640px)**
   - Base styles
   - Single column layouts
   - Compact spacing

2. **Tablet (640px+)**
   - `sm:` prefix
   - 2-column grids
   - Medium spacing

3. **Laptop (768px+)**
   - `md:` prefix
   - 2-3 column grids
   - Full spacing

4. **Desktop (1024px+)**
   - `lg:` prefix
   - 3-4 column grids
   - Maximum spacing

### Mobile-First Approach

1. **Base Styles**
   - Optimized for mobile
   - Smallest viewport first

2. **Progressive Enhancement**
   - Add features for larger screens
   - Never remove functionality

---

## Form Handling

### React Form Pattern

1. **Controlled Components**
   ```jsx
   const [formData, setFormData] = useState({ ... });
   
   <input
     value={formData.name}
     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
   />
   ```

2. **Form Submission**
   ```jsx
   const handleSubmit = (e) => {
     e.preventDefault();
     // Handle submission
   };
   ```

3. **Validation**
   - HTML5 validation: `required`, `type="email"`, `type="tel"`
   - Client-side validation ready

---

## Styling Patterns

### Component Styling

1. **Utility Classes**
   - Tailwind utilities for all styling
   - No custom CSS files needed
   - Consistent design system

2. **Conditional Classes**
   - Dynamic classes based on state
   - Variant support (e.g., Logo light/dark)

3. **Responsive Classes**
   - Breakpoint-specific styles
   - Fluid typography and spacing

---

## Performance Optimizations

### Tailwind CSS

1. **PurgeCSS**
   - Removes unused styles in production
   - Smaller bundle size

2. **Utility-First**
   - No runtime CSS generation
   - Fast rendering

### React

1. **Component Splitting**
   - Small, focused components
   - Easy to optimize individually

2. **No Heavy Dependencies**
   - Minimal bundle size
   - Fast load times

---

## Code Organization

### File Structure

```
src/
├── components/
│   ├── Logo.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Benefits.jsx
│   ├── ProductShowcase.jsx
│   ├── Trust.jsx
│   ├── OrderForm.jsx
│   └── Footer.jsx
├── App.jsx
├── index.css
└── main.jsx
```

### Component Pattern

```jsx
// Import
import Component from './Component';

// Export
export default function Component() {
  return (
    <section className="...">
      {/* Content */}
    </section>
  );
}
```

---

## Best Practices Applied

### From ui-ux-pro-max.md

1. ✅ **Responsive design** - Mobile-first approach
2. ✅ **Accessibility** - Semantic HTML, ARIA labels
3. ✅ **Performance** - Optimized components
4. ✅ **Maintainability** - Clean code structure
5. ✅ **Consistency** - Design system usage

---

**Last Updated:** 2025-01-24
