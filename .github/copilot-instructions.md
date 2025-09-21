# COPILOT INSTRUCTIONS - React Frontend

## TECH STACK
- React 18.2.0 + Vite
- Zustand 4.5.5 (state + persistence)
- React Hook Form + Zod validation
- TailwindCSS + Flowbite React
- React Router DOM v6
- Axios for API calls

## ARCHITECTURE RULES

### File Organization
- Components in `src/components/` (Commons/, Wrappers/)
- Pages in `src/pages/` for route components
- API services in `src/api/` organized by feature
- Validation schemas in `src/utils/`
- Zustand store in `src/app/store.js`

### Component Standards
- Use ONLY functional components with hooks
- PascalCase naming for components
- Destructure props and use meaningful names
- Max 200 lines per component - split if larger
- One component per file

## STATE MANAGEMENT (ZUSTAND)

### Store Guidelines
- Follow existing store pattern in `src/app/store.js`
- Use `persist` middleware for data that survives refreshes
- Actions as functions within store: `setFormData`, `setAccessToken`
- Use shallow comparison for complex selectors
- NO sensitive data in persisted state (passwords, tokens expire)
- Group related state together (auth, user, forms)

## FORMS & VALIDATION

### React Hook Form Rules
- ALWAYS use `zodResolver` for validation
- Import schemas from `src/utils/validationSchema.js`
- Handle `errors` and `isSubmitting` states
- Use `register` for inputs, `handleSubmit` for form submission
- Set meaningful `defaultValues`

### Zod Schema Requirements
- Follow existing patterns in `src/utils/`
- Use `.refine()` for complex validations
- Provide clear error messages in Spanish
- Chain validations: `.min().max().regex()`
## STYLING (TAILWIND + FLOWBITE)

### TailwindCSS Rules
- Use utility classes ONLY - no custom CSS
- Mobile-first responsive: `sm:`, `md:`, `lg:`, `xl:`
- Consistent spacing: `p-4`, `m-2`, `gap-3`
- Use Flexbox/Grid utilities for layouts
- Follow existing color scheme in project

### Flowbite Components
- Import components from `flowbite-react`
- Use existing components: `Button`, `Card`, `Modal`, `Alert`
- Combine with Tailwind classes for customization
- Follow Flowbite props and color schemes

## ROUTING (REACT ROUTER V6)

### Route Structure
- Follow existing pattern in `src/routes/`
- Use `createBrowserRouter` for route definition
- Nested routes with `children` array
- Index routes for default paths

### Navigation Rules
- Use `useNavigate` hook for programmatic navigation
- Use `Link` component for declarative navigation
- Use `replace: true` for login/logout redirects
- Handle protected routes with authentication checks
```

## STYLING WITH TAILWINDCSS + FLOWBITE

### TailwindCSS Best Practices
```js
// Use utility classes consistently
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
  <span className="text-lg font-semibold text-gray-900">Title</span>
  <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
    Action
  </button>
</div>
```

### Flowbite React Integration
```js
import { Button, Card, Modal, Alert } from 'flowbite-react';

// Use Flowbite components consistently
<Card className="max-w-sm">
  <Alert color="success">
    <span className="font-medium">Success!</span> Operation completed.
  </Alert>
  <Button color="blue" onClick={handleClick}>
    Submit
```javascript
import { Button, Card, Modal, Alert } from 'flowbite-react';

// Use Flowbite components consistently
<Card className="max-w-sm">
  <Alert color="success">
    <span className="font-medium">Success!</span> Operation completed.
  </Alert>
  <Button color="blue" onClick={handleClick}>
    Submit
  </Button>
</Card>
```

### Responsive Design Patterns
- Mobile-first approach: `sm:`, `md:`, `lg:`, `xl:`
- Use Flexbox and Grid utilities
- Implement proper spacing with `p-`, `m-`, `gap-`
- Ensure proper contrast ratios for accessibility

## REACT ROUTER DOM V6

### Route Configuration
```javascript
// Follow existing pattern in src/routes/
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
    ]
  }
]);
```

### Navigation Patterns
```javascript
import { useNavigate, useLocation, Link } from 'react-router-dom';

// Programmatic navigation
const navigate = useNavigate();
const handleLogin = () => navigate('/dashboard', { replace: true });

// Declarative navigation
<Link to="/dashboard" className="text-blue-600 hover:underline">
  Go to Dashboard
</Link>
```

## API CALLS (AXIOS)

### Service Organization
- Group API calls by feature in `src/api/`
- Use configured axios instance from `src/api/axios.js`
- Export service objects with methods
- Handle authentication headers automatically

### Error Handling Rules
- ALWAYS use try-catch for async calls
- Handle 401 errors with logout/redirect
- Show user-friendly error messages
- Log technical errors for debugging

## JAVASCRIPT STANDARDS

### Modern Syntax Requirements
- ES6+: arrow functions, destructuring, template literals
- Use `const`/`let`, NEVER `var`
- Optional chaining (`?.`) and nullish coalescing (`??`)
- Async/await over promise chains
- ES module imports/exports only

### React Hooks Rules
- Custom hooks start with `use` prefix
- Extract reusable logic into custom hooks
- Always handle loading, error, and success states
- Use proper dependency arrays in `useEffect`

## ACCESSIBILITY

### Required Standards
- Use semantic HTML elements (`button`, `nav`, `main`, `section`)
- Add proper ARIA labels and roles
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG AA minimum)
- Include alt text for images
- Link forms inputs with labels using `htmlFor`

## PERFORMANCE

### Optimization Rules
- Use `React.memo()` for components that re-render frequently
- Lazy load routes with `React.lazy()`
- Optimize images: WebP format, lazy loading
- Use proper dependency arrays in hooks
- Avoid inline functions in render

## SECURITY

### Frontend Security Rules
- Validate ALL user inputs with Zod schemas
- Never store passwords or sensitive data in localStorage
- Use HTTPS for API communications
- Sanitize data before rendering to prevent XSS
- Implement token expiration checks

## FORBIDDEN PRACTICES

### Never Do This
- Direct DOM manipulation - use React state
- Inline styles - use Tailwind classes only  
- Mutating props or state directly
- Ignoring form validation
- Missing loading/error states
- Excessive prop drilling - use Zustand
- Components over 200 lines - split them
- Hardcoded values - use constants or config