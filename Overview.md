# Gründen Prototype - Overview

## Purpose

This is a prototype application for registering new companies in Germany. It provides a multi-step form wizard that guides users through the process of starting a business, collecting necessary information, and generating a personalized checklist of next steps.

The application is built for German public administration use cases and follows the **KERN UX Design System** - an open UX standard for German government digital services.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Components**: @kern-ux-annex/kern-react-kit (React implementation of KERN UX)
- **Styling**: @kern-ux/native (KERN CSS) + Tailwind CSS
- **Accessibility**: Base UI (@base-ui/react) for complex components like Combobox

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main multi-step form component
│   ├── layout.tsx        # Root layout with metadata
│   ├── globals.css       # Global styles (KERN CSS imports)
│   └── types.ts          # TypeScript types and form options
├── components/
│   ├── KernCombobox.tsx       # Custom combobox using Base UI + KERN styling
│   ├── KernCombobox.module.css
│   ├── RechtsformHelper.tsx   # Guided questionnaire for legal form selection
│   └── RechtsformHelper.module.css
```

## Form Flow (6 Steps)

### Step 1: Rechtsform (Legal Form)
- User selects company legal form via radio buttons
- Options: Einzelunternehmen, GmbH, GbR, UG, AG, OHG, KG
- Includes "Hilfe bei der Auswahl" helper wizard that asks 3 questions and recommends a legal form

### Step 2: Tätigkeit (Business Activity)
- User selects business purpose via autocomplete combobox
- Must choose from predefined options (currently: Eisanbieter, Eiscafe, Eisdiele, Eisenbahngesellschaft)

### Step 3: Nebentätigkeit (Side Activity)
- Yes/No question: "Wird dein Startup erstmal eine Nebentätigkeit sein?"
- If "Ja" selected, shows info alert about health insurance implications

### Step 4: Angestellte (Employees)
- Radio buttons: "Mit Angestellten" or "Ohne Angestellte"

### Step 5: Checkliste (Checklist)
- Shows personalized checklist based on user's answers (currently placeholders)
- Items like: Gewerbeanmeldung, Finanzamt Fragebogen, Geschäftskonto, etc.

### Step 6: Zusammenfassung (Summary)
- Displays all collected information for review
- "Absenden" button to submit

## Data Model

Defined in `src/app/types.ts`:

```typescript
interface FormData {
  rechtsform: Rechtsform | "";        // Legal form selection
  taetigkeit: string;                  // Business activity
  isSideActivity: SideActivity;        // "yes" | "no" | ""
  hasEmployees: HasEmployees;          // "with" | "without" | ""
}
```

## Key Components

### KernCombobox (`src/components/KernCombobox.tsx`)
Custom combobox component built with:
- Base UI's Combobox for accessibility (keyboard nav, ARIA)
- KERN UX styling (design tokens, colors, typography)
- Features: type-ahead filtering, required selection from options

### RechtsformHelper (`src/components/RechtsformHelper.tsx`)
Guided questionnaire modal that helps users choose the right legal form:
1. Solo or team founding?
2. Need liability protection?
3. How much starting capital?

Returns recommendation with explanation.

## KERN UX Grid System

The app uses KERN's 12-column responsive grid:
- `KernContainer` - Page wrapper
- `KernRow` - Horizontal row (flexbox)
- `KernColumn` - Column with responsive sizes

Example:
```tsx
<KernRow>
  <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
    {/* Content */}
  </KernColumn>
</KernRow>
```

Grid provides spacing through column gutters. Vertical spacing comes from stacking rows.

## Styling Notes

- KERN CSS imported in `globals.css`
- Uses KERN design tokens (CSS variables) like `--kern-color-*`, `--kern-metric-*`
- Component-specific styles use CSS Modules (`.module.css`)
- KernSpace component exists in React kit but CSS classes are not in @kern-ux/native - use grid rows for spacing instead

## Navigation

- Forward/back navigation with state persistence
- "Weiter" button disabled until required fields are filled
- `canProceed()` function validates each step
- Form state managed with React useState

## Future Considerations

- Checklist items should be dynamically generated based on form answers
- Additional legal forms may need more detailed helper logic
- Integration with actual registration APIs
- User authentication and data persistence
