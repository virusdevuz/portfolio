from django.utils import timezone

from . import data


def site_meta(request):
    """Small, global values used by the navigation, footer and SEO tags."""
    return {
        "site": data.SITE,
        "nav_items": data.NAV_ITEMS,
        "socials": data.SOCIALS,
        "current_year": timezone.now().year,
        "media_url": "/media/",
    }
