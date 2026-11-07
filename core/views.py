from django.contrib import messages
from django.shortcuts import redirect, render

from . import data
from .forms import ContactForm


def home(request):
    featured = [project for project in data.PROJECTS if project["featured"]]
    context = {
        "page_title": "",
        "page_description": data.SITE["bio_short"],
        "stats": data.STATS,
        "tech_marquee": data.TECH_MARQUEE,
        "services": data.SERVICES[:4],
        "projects": featured[:3],
        "certificates": data.CERTIFICATES[:3],
        "total_certificates": len(data.CERTIFICATES),
        "skills": data.SKILLS,
        "toolbox": data.TOOLBOX,
        "journey": data.JOURNEY[:3],
    }
    return render(request, "core/home.html", context)


def about(request):
    context = {
        "page_title": "About Me",
        "page_description": (
            "The story of Abdyrakhmon Majidov — a young full-stack developer from "
            "Bukhara, Uzbekistan, building for the web since the fifth grade."
        ),
        "journey": data.JOURNEY,
        "skills": data.SKILLS,
        "toolbox": data.TOOLBOX,
        "hobbies": data.HOBBIES,
        "values": data.VALUES,
        "quick_facts": data.QUICK_FACTS,
        "stats": data.STATS,
    }
    return render(request, "core/about.html", context)


def services(request):
    context = {
        "page_title": "Services",
        "page_description": (
            "Frontend, backend, full-stack Python, Node.js, responsive design and REST "
            "API development by Abdyrakhmon Majidov."
        ),
        "services": data.SERVICES,
        "process": data.PROCESS,
        "toolbox": data.TOOLBOX,
    }
    return render(request, "core/services.html", context)


def certificates(request):
    context = {
        "page_title": "Certificates",
        "page_description": (
            "Ten verified course certificates in frontend development, Python, "
            "TypeScript, Bootstrap and computer science."
        ),
        "certificates": data.CERTIFICATES,
        "categories": data.CERTIFICATE_CATEGORIES,
        "total": len(data.CERTIFICATES),
    }
    return render(request, "core/certificates.html", context)


def projects(request):
    context = {
        "page_title": "Projects",
        "page_description": (
            "A selection of full-stack, frontend and backend projects built with Django, "
            "Python, JavaScript and Node.js."
        ),
        "projects": data.PROJECTS,
        "categories": data.PROJECT_CATEGORIES,
        "total": len(data.PROJECTS),
    }
    return render(request, "core/projects.html", context)


def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            # Silently drop honeypot submissions without saving them.
            if form.cleaned_data.get("website"):
                return redirect("contact")
            form.save()
            messages.success(
                request,
                "Thank you! Your message is safely in my inbox. I will get back to you within 24 hours.",
            )
            return redirect("contact")
        messages.error(request, "Almost there — please check the highlighted fields and try again.")
    else:
        initial = {}
        requested_service = request.GET.get("service", "")
        valid_services = {value for value, _label in data.CONTACT_SERVICES}
        if requested_service in valid_services:
            initial["service"] = requested_service
        form = ContactForm(initial=initial)

    context = {
        "page_title": "Contact",
        "page_description": (
            "Have a project in mind? Get in touch with Abdyrakhmon Majidov — full-stack "
            "Python developer based in Bukhara, Uzbekistan."
        ),
        "form": form,
        "faq": data.FAQ,
        "contact_services": data.CONTACT_SERVICES,
    }
    return render(request, "core/contact.html", context)
