from django.db import models

from .data import CONTACT_SERVICES


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=180, blank=True)
    service = models.CharField(
        max_length=40,
        choices=CONTACT_SERVICES,
        blank=True,
        help_text="Service the visitor is interested in.",
    )
    message = models.TextField(max_length=4000)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact message"
        verbose_name_plural = "Contact messages"

    def __str__(self):
        return f"{self.name} — {self.subject or 'New enquiry'}"
