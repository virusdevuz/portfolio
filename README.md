# VIRUS Portfolio — Majidov Abdyrakhmon

A modern, responsive, liquid-glass portfolio built with Python and Django. The site showcases Majidov Abdyrakhmon's background, services, certificates and projects with a dark aurora aesthetic, glassmorphism panels, and dependency-free interactive JavaScript.

## Features

- Six pages: Home, About, Services, Certificates, Projects, Contact
- Liquid-glass design system with animated aurora backgrounds and custom cursor
- Responsive layout across mobile, tablet, laptop and desktop breakpoints
- Animated counters, scroll reveals, typewriter hero, tilt cards and spotlights
- Certificate gallery with category filters and an accessible lightbox (keyboard + swipe)
- Project gallery with filters and deep-linkable detail modals
- Contact form with honeypot spam protection, persisted to SQLite and manageable in Django admin
- Reduced-motion support and guarded, dependency-free JavaScript

## Requirements

- Python 3.10+ (developed on Python 3.15)
- Django 6.1

## Getting started

```bash
# 1. Install dependencies
python -m pip install -r requirements.txt

# 2. Apply database migrations
python manage.py migrate

# 3. (Optional) create an admin account for the contact inbox
python manage.py createsuperuser

# 4. Run the development server
python manage.py runserver
```

Then open <http://127.0.0.1:8000/>.

The admin panel is available at <http://127.0.0.1:8000/admin/>.

## Project structure

```
config/                  Django project settings and root URLs
core/
  data.py                All portfolio content (profile, skills, services, certificates, projects, FAQ)
  models.py              ContactMessage model
  forms.py               Contact form with honeypot field
  views.py               Page views and contact submission handling
  admin.py               Contact inbox registration
  context_processors.py  Shared media/URL template helpers
templates/
  base.html              Global layout: loader, navbar, footer, scripts
  core/                  Page templates
  partials/              Reusable CTA and icon sprite
static/
  css/                   Design tokens, layout, page styles, responsive rules
  js/main.js             All interactive behavior
images/                  Media root: portrait, logo, certificates
```

## Content management

- **Portfolio content** lives in `core/data.py`. Edit the profile, skills, services, certificates and projects there.
- **Contact messages** are stored in the database and visible under *Contact messages* in the Django admin.
- **Images** are served from the existing `images/` folder (`MEDIA_ROOT`). Certificate files for the web live in `images/certificates/web/`.

## Notes

- The contact form uses a hidden `website` honeypot field; submissions that fill it are silently discarded.
- Email delivery is not configured; messages are stored in SQLite. To add email notifications, configure an email backend and send from `core/views.py`.
- `DEBUG` is enabled for local development. Before deploying, set `DEBUG = False`, provide a secure `SECRET_KEY`, and configure `ALLOWED_HOSTS`.
