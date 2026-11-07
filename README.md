# VIRUS Portfolio — Majidov Abdyrakhmon

A modern, fully responsive **liquid-glass portfolio website** built with **Python and Django**. The site presents the profile, services, certificates and projects of **Majidov Abdyrakhmon** — a young full-stack developer from Bukhara, Uzbekistan — through a dark aurora aesthetic, glassmorphism panels and dependency-free interactive JavaScript.

> **Tagline:** Code. Build. Innovate.

---

## Overview

| | |
|---|---|
| **Project** | Personal portfolio website |
| **Owner** | Majidov Abdyrakhmon (VIRUS) |
| **Role** | Full-Stack Python Developer |
| **Location** | Olmazor Street, Bukhara, Uzbekistan |
| **Email** | virusdev.uz@gmail.com |
| **Phone** | +998 (50) 716-47-41 |
| **Backend** | Python 3.15 · Django 6.1.3 · SQLite |
| **Frontend** | HTML5 · CSS3 · Vanilla JavaScript |
| **Fonts** | Sora · Manrope · JetBrains Mono (Google Fonts) |

The portfolio includes **6 pages**, **10 certificates**, **6 showcase projects** and **6 services**. All content is in English.

---

## Features

### Design
- Dark aurora background with animated gradient orbs and a liquid-glass design system
- Custom cursor with interactive hover states (disabled on touch devices)
- Glass navigation bar with scroll state, scroll progress indicator and active link highlighting
- Fully responsive across mobile, tablet, laptop and wide desktop screens
- Reduced-motion support for users who prefer less animation

### Interactions
- Page loader with animated logo
- Typewriter hero headline and animated statistics counters
- Scroll-reveal animations powered by `IntersectionObserver`
- 3D tilt cards and cursor-following spotlight effects
- Animated skill bars that fill when scrolled into view
- Infinite technology marquee
- FAQ accordion with accessible `aria-expanded` states
- Live local time for Bukhara
- Back-to-top button and flash-message dismissal

### Certificates
- Category filters with live counts (All, Frontend, Programming, Fundamentals, Computer Science)
- Accessible lightbox with previous/next navigation
- Keyboard support (`←`, `→`, `Esc`) and touch swipe navigation
- Focus trapping and focus restoration when the lightbox closes

### Projects
- Category filters with live counts
- Detailed case-study modals with features, tech stack and status
- Deep-link support: `/projects/#shopflow` opens the matching project automatically
- CSS-generated cover art for every project (no placeholder screenshots)

### Contact
- Contact form saved to SQLite through the `ContactMessage` model
- Honeypot spam protection (hidden `website` field)
- Server-side validation with friendly error messages
- Live character counter for the message field
- Loading state on the submit button
- Messages are manageable in the Django admin with an `is_read` flag

### Accessibility
- Semantic HTML landmarks and skip link
- Visible focus styles and keyboard-operable modals, menu and accordion
- ARIA attributes for menus, filters, modals and expandable panels
- `prefers-reduced-motion` handling in CSS and JavaScript

---

## Pages

| Route | Name | Description |
|---|---|---|
| `/` | Home | Hero, stats, services preview, skills, featured projects, certificates and CTA |
| `/about/` | About | Story, journey timeline, skills, toolbox, hobbies, values and quick facts |
| `/services/` | Services | Six services, development process and technology toolbox |
| `/certificates/` | Certificates | Filterable certificate gallery with lightbox |
| `/projects/` | Projects | Filterable project gallery with case-study modals |
| `/contact/` | Contact | Contact details, form, availability and FAQ |
| `/admin/` | Admin | Django admin for contact messages |

---

## Getting started

### Requirements
- **Python 3.12+** (developed with Python 3.15.2)
- **Django 6.1.3**
- No Node.js, npm or build step is required

### Installation (Windows PowerShell)

```powershell
# 1. Enter the project folder
cd C:\Users\virus\Desktop\portfolio-django

# 2. Install dependencies
python -m pip install -r requirements.txt

# 3. Apply database migrations
python manage.py migrate

# 4. (Optional) create an admin account for the contact inbox
python manage.py createsuperuser

# 5. Run the development server
python manage.py runserver
```

### Installation (macOS / Linux)

```bash
python3 -m pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser   # optional
python manage.py runserver
```

Open **<http://127.0.0.1:8000/>** in your browser.  
The admin panel is available at **<http://127.0.0.1:8000/admin/>**.

If port `8000` is busy:

```bash
python manage.py runserver 8080
```

---

## Project structure

```
portfolio-django/
├── config/                     Django project configuration
│   ├── settings.py             Settings: apps, templates, database, static/media
│   ├── urls.py                 Root URLs, admin and media serving
│   ├── asgi.py
│   └── wsgi.py
├── core/                       Main application
│   ├── data.py                 All portfolio content (single source of truth)
│   ├── models.py               ContactMessage model
│   ├── forms.py                Contact form, validation and honeypot
│   ├── views.py                Page views and contact submission handling
│   ├── urls.py                 App routes
│   ├── admin.py                Contact inbox registration
│   ├── context_processors.py   Global site metadata for templates
│   └── migrations/             Database migrations
├── templates/
│   ├── base.html               Global layout: loader, navbar, footer, SEO tags
│   ├── core/                   Page templates (home, about, services, ...)
│   └── partials/               Reusable CTA and SVG icon sprite
├── static/
│   ├── css/
│   │   ├── base.css            Design tokens, glass components, nav, footer, modals
│   │   ├── home.css            Hero, photo frames, stats, marquee, previews
│   │   ├── pages.css           About, services and shared page sections
│   │   ├── collections.css     Certificate and project grids, filters, lightbox
│   │   ├── contact.css         Contact page, form and FAQ accordion
│   │   └── responsive.css      Breakpoints and reduced-motion rules
│   ├── js/main.js              All interactive behavior (dependency-free)
│   └── favicon.svg
├── images/                     Media root (MEDIA_ROOT)
│   ├── image-majidov-abdurakhmon.png
│   ├── image-majidov-abdurakhmon-2.png
│   ├── logo-full.png
│   ├── logo-removedbg.png
│   └── certificates/
│       ├── *.png               Original certificates
│       └── web/*.png           ASCII-named web copies used by the site
├── manage.py
├── requirements.txt
├── README.md
└── db.sqlite3                  Local database (not committed to Git)
```

---

## Content management

### Portfolio content
All text, statistics, skills, services, certificates, projects and FAQ entries live in **`core/data.py`**. Update the dictionaries and lists there — templates and views read from this single module.

- `SITE` — name, role, email, phone, location, birthday, tagline and bio
- `NAV_ITEMS` — navigation links
- `STATS` — animated counters
- `SKILLS` / `TOOLBOX` — skill bars and technology chips
- `SERVICES` / `PROCESS` — service cards and workflow
- `CERTIFICATES` / `CERTIFICATE_CATEGORIES` — gallery content and filters
- `PROJECTS` / `PROJECT_CATEGORIES` — showcase projects and filters
- `FAQ` / `CONTACT_SERVICES` — contact page content

### Images
Images are served from the existing `images/` folder, configured as `MEDIA_ROOT`:

```python
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "images"
```

To add a certificate:
1. Put the original image in `images/certificates/`.
2. Add an ASCII-named web copy to `images/certificates/web/` (recommended for clean URLs).
3. Add a new entry to `CERTIFICATES` in `core/data.py` with the `image` path relative to `images/`.

### Contact messages
Messages submitted through the contact form are stored in SQLite and appear in the Django admin under **Contact messages**. Each message has:

- name, email, subject, service and message
- `created_at` timestamp
- `is_read` flag for inbox management

### Social links
Contact cards and footer links are generated from `SOCIALS` in `core/data.py`.

---

## Contact form behavior

1. The visitor submits the form with a CSRF token.
2. The hidden `website` honeypot field must remain empty; filled submissions are silently redirected without being saved.
3. The message must contain at least 10 characters.
4. Valid submissions are saved to `ContactMessage` and a success flash message is shown.
5. Email delivery is **not** configured by default. To send notifications, configure an email backend in `config/settings.py` and call `send_mail()` from `core/views.py`.

---

## Design system

The interface is built on CSS custom properties defined in `static/css/base.css`:

- **Colors:** deep navy backgrounds, violet/cyan/pink accents
- **Glass:** translucent panels with backdrop blur, soft borders and inner highlights
- **Typography:** Sora for headings, Manrope for body text, JetBrains Mono for labels
- **Motion:** reveal, float, aurora, marquee and hover transitions
- **Breakpoints:** mobile-first layout tuned for 390 px, tablets, laptops and wide screens

All JavaScript lives in `static/js/main.js` and is organized into guarded feature initializers, so a missing element on one page never breaks the rest of the site.

---

## Deployment notes

Before deploying to production:

1. Set `DEBUG = False` in `config/settings.py`.
2. Replace the development `SECRET_KEY` with a secure environment variable.
3. Set `ALLOWED_HOSTS` to your real domain(s).
4. Run `python manage.py collectstatic` and serve `STATIC_ROOT`.
5. Serve `MEDIA_ROOT` through your web server or storage provider.
6. Configure a production database (PostgreSQL recommended) and email backend.
7. Use HTTPS and secure cookies (`CSRF_COOKIE_SECURE`, `SESSION_COOKIE_SECURE`).

---

## Author

**Majidov Abdyrakhmon (VIRUS)**  
Full-Stack Python Developer · Bukhara, Uzbekistan  
Email: [virusdev.uz@gmail.com](mailto:virusdev.uz@gmail.com)  
Phone: +998 (50) 716-47-41  
GitHub: [@virusdevuz](https://github.com/virusdevuz)

---

## License

This is a personal portfolio project. The code may be used for learning and inspiration. The portrait, logo and certificate images belong to Majidov Abdyrakhmon and may not be reused without permission.
