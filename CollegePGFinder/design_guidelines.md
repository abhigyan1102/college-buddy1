# Design Guidelines: College PG Finder

## Design Approach
**Reference-Based Hybrid**: Drawing inspiration from Airbnb's accommodation browsing patterns combined with Google Maps' location-centric interface. This utility-focused platform prioritizes findability and trust-building through authentic student reviews.

## Core Design Principles
1. **Location-First**: Map and proximity are primary navigation tools
2. **Trust Through Community**: Emphasize member-verified reviews and ratings
3. **Mobile-Priority**: Students search on-the-go - design mobile-first
4. **Quick Scanning**: Dense information presented clearly for fast decision-making

## Typography
- **Primary Font**: Inter (via Google Fonts CDN) - clean, readable at all sizes
- **Hierarchy**:
  - H1 (Hero/Page Titles): text-4xl, font-bold
  - H2 (Section Headers): text-2xl, font-semibold  
  - H3 (PG Names, Card Headers): text-xl, font-semibold
  - Body Text: text-base, font-normal
  - Metadata (distance, price): text-sm, font-medium
  - Small Labels: text-xs, font-medium

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently (p-4, m-6, gap-8, etc.)

**Container Strategy**:
- Full-width sections: w-full with max-w-7xl mx-auto px-4
- Content areas: max-w-6xl
- Form containers: max-w-md

**Grid Patterns**:
- Desktop PG listings: 2-column grid (sidebar filters + main content)
- PG cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Mobile: Single column stack

## Page Structure

### Hero Section (Compact, Functional)
- Height: 60vh on desktop, auto on mobile
- Background: Blurred college campus image with gradient overlay
- Center-aligned search box with location detection button
- Heading: "Find Your Perfect PG Near [College Name]"
- Subheading: "Verified reviews from fellow students"
- CTA: Large search bar with "Use My Location" button (blurred background, no hover states on image buttons)

### Main Interface (Split Layout)
**Left Sidebar (Desktop) / Collapsible Panel (Mobile)**:
- Filters: Price range slider, distance radius, amenities checkboxes, room type
- Sticky positioning on desktop
- Width: w-80 on lg screens

**Center Content Area**:
- Interactive map at top (h-96) showing PG markers and college location
- Scrollable PG listing cards below map
- Sort options: Distance, Price, Rating

**PG Listing Cards**:
- Image carousel (3-4 photos per PG)
- PG name, distance from college (bold, prominent)
- Price range per month
- Star rating (5-star system) with review count
- Key amenities (3-4 icons: WiFi, meals, parking, laundry)
- "View Details" button
- Member badge if user has reviewed

### PG Detail Page
**Image Gallery**: Full-width hero gallery (h-[500px]) with thumbnail navigation

**Two-Column Layout**:
- **Left Column (2/3 width)**:
  - PG details: address, contact, full amenities list
  - Map showing exact location
  - House rules section
  
- **Right Column (1/3 width, sticky)**:
  - Price card with booking/contact CTA
  - Owner contact info
  - Quick stats (rating, reviews, distance)

**Reviews Section** (Full Width Below):
- Member-only indicator banner
- Review cards with: student name, rating, review date, text, helpful votes
- "Write Review" button (prominent for logged-in members)
- Sort by: Most Recent, Highest Rated, Most Helpful

### Authentication States
**Non-Member View**:
- Blurred review text with "Sign up to read reviews" overlay
- Prominent registration CTAs
- Lock icons on review sections

**Member View**:
- Full review access
- "Write Review" capability
- Member badge display

## Component Library

### Navigation Bar
- Sticky header, h-16
- Logo (left), Search (center), Auth buttons (right)
- Mobile: Hamburger menu, compact search icon

### Cards
- Rounded corners (rounded-lg)
- Subtle shadow (shadow-md, hover:shadow-lg)
- Padding: p-6
- Border: border border-gray-200

### Buttons
- Primary CTA: Large (px-6 py-3), rounded-lg, bold text
- Secondary: Outlined style, same sizing
- Icon buttons: Rounded-full, p-2
- Blurred backgrounds when on images

### Form Inputs
- Height: h-12
- Rounded: rounded-lg  
- Focus states: ring-2 with offset
- Placeholder styling: text-gray-400

### Map Component
- Interactive with custom markers
- College location: Different color pin (prominent)
- PG locations: Clustered markers with price labels
- Click to preview PG in popup

### Star Ratings
- 5-star system, text-yellow-400 filled stars
- Half-star support for averages
- Size variants: Small (reviews count), Large (headers)

### Icons
- **Library**: Heroicons (via CDN)
- Usage: Amenity icons, navigation, status indicators
- Size: w-5 h-5 for inline, w-6 h-6 for featured

## Images

### Hero Section
- Large blurred background image of college campus/student housing area
- Creates context and familiarity for students
- Gradient overlay for text readability

### PG Listing Cards
- 2-3 photos per card in carousel format
- Aspect ratio: 16:9
- Show: exterior, room interior, common areas

### PG Detail Page
- 5-8 high-quality images in hero gallery
- Comprehensive view of property

## Accessibility
- Semantic HTML throughout
- ARIA labels for map interactions and image carousels
- Keyboard navigation for all interactive elements
- Consistent form input styling with visible focus states
- Screen reader announcements for dynamic content (review loading, map updates)

## Animations
Use sparingly - functional only:
- Smooth scroll to PG cards when map marker clicked
- Card hover lift (subtle translate-y)
- Filter panel slide-in on mobile
- No distracting decorative animations