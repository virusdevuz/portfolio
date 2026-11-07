from django import forms

from .models import ContactMessage


class ContactForm(forms.ModelForm):
    """Contact form with styled fields and a simple honeypot for bots."""

    website = forms.CharField(
        required=False,
        label="",
        widget=forms.TextInput(
            attrs={
                "class": "hp-input",
                "tabindex": "-1",
                "autocomplete": "off",
                "aria-hidden": "true",
            }
        ),
    )

    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "service", "message"]
        widgets = {
            "name": forms.TextInput(
                attrs={
                    "class": "field__input",
                    "placeholder": "How should I call you?",
                    "autocomplete": "name",
                    "maxlength": "120",
                    "required": True,
                }
            ),
            "email": forms.EmailInput(
                attrs={
                    "class": "field__input",
                    "placeholder": "you@example.com",
                    "autocomplete": "email",
                    "required": True,
                }
            ),
            "subject": forms.TextInput(
                attrs={
                    "class": "field__input",
                    "placeholder": "A short title for your idea",
                    "maxlength": "180",
                }
            ),
            "service": forms.Select(
                attrs={
                    "class": "field__input field__select",
                }
            ),
            "message": forms.Textarea(
                attrs={
                    "class": "field__input field__textarea",
                    "placeholder": "Tell me about your project, goals and timeline…",
                    "rows": 6,
                    "maxlength": "4000",
                    "required": True,
                    "data-counter-target": "messageCounter",
                }
            ),
        }
        labels = {
            "name": "Your name",
            "email": "Email address",
            "subject": "Subject",
            "service": "What do you need?",
            "message": "Project details",
        }
        error_messages = {
            "name": {"required": "Please tell me your name."},
            "email": {"required": "An email address is required.", "invalid": "Please enter a valid email address."},
            "message": {"required": "Please add a few details about your project."},
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["service"].choices = [("", "Select a service (optional)")] + [
            (value, label) for value, label in self.fields["service"].choices if value
        ]

    def clean_website(self):
        # Honeypot must stay empty. Returning it lets the view ignore bot submissions.
        return self.cleaned_data.get("website", "")

    def clean_message(self):
        message = self.cleaned_data["message"].strip()
        if len(message) < 10:
            raise forms.ValidationError("Please add a little more detail (at least 10 characters).")
        return message
