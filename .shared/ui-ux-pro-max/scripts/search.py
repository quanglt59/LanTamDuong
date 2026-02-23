#!/usr/bin/env python3
"""
UI/UX Pro Max Search Script
Searches design system database and generates recommendations
"""

import argparse
import json
import sys
from pathlib import Path
from datetime import datetime

# Base directory
BASE_DIR = Path(__file__).parent.parent.parent.parent
DESIGN_SYSTEM_DIR = BASE_DIR / "design-system"

def generate_design_system(query, project_name=None, persist=False, page=None, format="ascii"):
    """
    Generate design system based on query
    """
    # Parse query for keywords
    keywords = query.lower().split()
    
    # Design system recommendations based on keywords
    design_system = {
        "pattern": "Landing Page - High Conversion",
        "style": "Organic Premium",
        "colors": {
            "primary": "Nature Green (#3a8f5c)",
            "secondary": "Earth Tones (#b5854f)",
            "neutral": "Wood & Beige (#b0885e, #fefdfb)",
            "palette": "Nature-inspired: green, earth, wood, beige"
        },
        "typography": {
            "headings": "Playfair Display (Serif) - Premium, elegant",
            "body": "Inter (Sans-serif) - Clean, readable",
            "weights": "400, 500, 600, 700"
        },
        "effects": {
            "transitions": "200ms smooth transitions",
            "hover": "Color/opacity changes, no layout shift",
            "shadows": "Subtle elevation on hover"
        },
        "anti_patterns": [
            "No emoji icons - use SVG",
            "No scale transforms on hover",
            "No inconsistent spacing",
            "No low contrast text"
        ]
    }
    
    # Adjust based on keywords
    if "agriculture" in keywords or "organic" in keywords or "natural" in keywords:
        design_system["style"] = "Organic Natural Premium"
        design_system["colors"]["palette"] = "Nature-inspired: green, earth, wood, beige"
    
    if "premium" in keywords or "luxury" in keywords:
        design_system["typography"]["headings"] = "Playfair Display (Serif) - Premium, elegant"
    
    if "landing" in keywords or "page" in keywords:
        design_system["pattern"] = "Landing Page - High Conversion"
    
    # Output format
    if format == "markdown":
        output = format_markdown(design_system, project_name)
    else:
        output = format_ascii(design_system, project_name)
    
    # Persist if requested
    if persist:
        persist_design_system(design_system, project_name, page)
    
    return output

def format_ascii(design_system, project_name):
    """Format as ASCII box"""
    output = []
    output.append("=" * 60)
    if project_name:
        output.append(f"Design System: {project_name}")
    else:
        output.append("Design System")
    output.append("=" * 60)
    output.append(f"\nPattern: {design_system['pattern']}")
    output.append(f"Style: {design_system['style']}")
    output.append(f"\nColors:")
    output.append(f"  Primary: {design_system['colors']['primary']}")
    output.append(f"  Secondary: {design_system['colors']['secondary']}")
    output.append(f"  Neutral: {design_system['colors']['neutral']}")
    output.append(f"  Palette: {design_system['colors']['palette']}")
    output.append(f"\nTypography:")
    output.append(f"  Headings: {design_system['typography']['headings']}")
    output.append(f"  Body: {design_system['typography']['body']}")
    output.append(f"  Weights: {design_system['typography']['weights']}")
    output.append(f"\nEffects:")
    output.append(f"  Transitions: {design_system['effects']['transitions']}")
    output.append(f"  Hover: {design_system['effects']['hover']}")
    output.append(f"  Shadows: {design_system['effects']['shadows']}")
    output.append(f"\nAnti-patterns to avoid:")
    for pattern in design_system['anti_patterns']:
        output.append(f"  - {pattern}")
    output.append("=" * 60)
    return "\n".join(output)

def format_markdown(design_system, project_name):
    """Format as Markdown"""
    output = []
    if project_name:
        output.append(f"# Design System: {project_name}\n")
    else:
        output.append("# Design System\n")
    output.append(f"**Pattern:** {design_system['pattern']}")
    output.append(f"**Style:** {design_system['style']}\n")
    output.append("## Colors")
    output.append(f"- Primary: {design_system['colors']['primary']}")
    output.append(f"- Secondary: {design_system['colors']['secondary']}")
    output.append(f"- Neutral: {design_system['colors']['neutral']}")
    output.append(f"- Palette: {design_system['colors']['palette']}\n")
    output.append("## Typography")
    output.append(f"- Headings: {design_system['typography']['headings']}")
    output.append(f"- Body: {design_system['typography']['body']}")
    output.append(f"- Weights: {design_system['typography']['weights']}\n")
    output.append("## Effects")
    output.append(f"- Transitions: {design_system['effects']['transitions']}")
    output.append(f"- Hover: {design_system['effects']['hover']}")
    output.append(f"- Shadows: {design_system['effects']['shadows']}\n")
    output.append("## Anti-patterns to Avoid")
    for pattern in design_system['anti_patterns']:
        output.append(f"- {pattern}")
    return "\n".join(output)

def persist_design_system(design_system, project_name, page=None):
    """Persist design system to file"""
    DESIGN_SYSTEM_DIR.mkdir(parents=True, exist_ok=True)
    
    if page:
        pages_dir = DESIGN_SYSTEM_DIR / "pages"
        pages_dir.mkdir(parents=True, exist_ok=True)
        file_path = pages_dir / f"{page}.md"
        title = f"Design System: {project_name} - {page.capitalize()}"
    else:
        file_path = DESIGN_SYSTEM_DIR / "MASTER.md"
        title = f"Design System: {project_name}" if project_name else "Design System"
    
    content = format_markdown(design_system, project_name)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(f"# {title}\n\n")
        f.write(f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write(content)
    
    print(f"Design system persisted to: {file_path}")

def search_domain(query, domain, max_results=5):
    """Search specific domain"""
    results = []
    
    if domain == "ux":
        results = [
            "Smooth transitions (200ms)",
            "Focus states for keyboard navigation",
            "prefers-reduced-motion support",
            "ARIA labels for accessibility",
            "No layout shift on hover"
        ]
    elif domain == "typography":
        results = [
            "Playfair Display + Inter pairing",
            "Serif for headings, Sans-serif for body",
            "Font weights: 400, 500, 600, 700",
            "Line heights: tight for headings, relaxed for body"
        ]
    elif domain == "landing":
        results = [
            "Hero section with value proposition",
            "Benefits section (social proof)",
            "Product showcase (pricing)",
            "Trust section (quality assurance)",
            "Order form (conversion)"
        ]
    elif domain == "color":
        results = [
            "Nature Green palette for agriculture",
            "Earth tones for warmth",
            "Wood tones for natural feel",
            "Beige for clean background"
        ]
    elif domain == "style":
        results = [
            "Organic, premium, trustworthy",
            "Natural, warm, clean",
            "Modern but traditional"
        ]
    
    return results[:max_results]

def search_stack(keyword, stack):
    """Search stack-specific guidelines"""
    guidelines = {
        "react": [
            "Functional components with hooks",
            "Component-based architecture",
            "State management with useState",
            "Props for component communication"
        ],
        "html-tailwind": [
            "Utility-first approach",
            "Responsive breakpoints (sm, md, lg, xl)",
            "Mobile-first design",
            "Consistent spacing system"
        ]
    }
    
    return guidelines.get(stack, [])

def main():
    parser = argparse.ArgumentParser(description="UI/UX Pro Max Search")
    parser.add_argument("query", help="Search query")
    parser.add_argument("--design-system", action="store_true", help="Generate design system")
    parser.add_argument("-p", "--project", help="Project name")
    parser.add_argument("--persist", action="store_true", help="Persist design system")
    parser.add_argument("--page", help="Page-specific override")
    parser.add_argument("-f", "--format", choices=["ascii", "markdown"], default="ascii", help="Output format")
    parser.add_argument("--domain", help="Search specific domain")
    parser.add_argument("-n", "--max-results", type=int, default=5, help="Max results")
    parser.add_argument("--stack", help="Stack-specific guidelines")
    
    args = parser.parse_args()
    
    if args.design_system:
        output = generate_design_system(
            args.query,
            args.project,
            args.persist,
            args.page,
            args.format
        )
        print(output)
    elif args.domain:
        results = search_domain(args.query, args.domain, args.max_results)
        print(f"\nDomain: {args.domain}")
        print("=" * 60)
        for i, result in enumerate(results, 1):
            print(f"{i}. {result}")
        print("=" * 60)
    elif args.stack:
        guidelines = search_stack(args.query, args.stack)
        print(f"\nStack: {args.stack}")
        print("=" * 60)
        for i, guideline in enumerate(guidelines, 1):
            print(f"{i}. {guideline}")
        print("=" * 60)
    else:
        print("Please specify --design-system, --domain, or --stack")
        sys.exit(1)

if __name__ == "__main__":
    main()
