# Project Structure

This document outlines the organization of the source code in this Next.js application.

## Directory Structure

```
src/
├── app/                    # Next.js app router pages and layouts
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── styles/               # Global styles and theme
├── assets/               # Static assets
│   ├── images/          # Image files
│   └── icons/           # SVG icons
├── lib/                  # Library configurations
├── services/             # API and external services
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── types/                # TypeScript type definitions
└── constants/            # Application constants
```

## Usage Guidelines

### Components
- Place reusable UI components in `components/ui/`
- Layout components go in `components/layout/`
- Feature-specific components should be organized in `components/features/[feature-name]/`

### Styles
- Global styles should be in `styles/`
- Component-specific styles should be co-located with their components
- Use CSS modules for component-specific styles

### Assets
- Store images in `assets/images/`
- Store SVG icons in `assets/icons/`
- Use appropriate image formats and optimize for web

### Services
- API calls and external service integrations go in `services/`
- Group related services by domain

### Utils & Hooks
- Reusable utility functions in `utils/`
- Custom React hooks in `hooks/`
- Keep functions pure and well-documented

### Types
- Define TypeScript types in `types/`
- Use interfaces for object shapes
- Use enums for constant values

### Constants
- Application-wide constants in `constants/`
- Configuration values
- Static data 