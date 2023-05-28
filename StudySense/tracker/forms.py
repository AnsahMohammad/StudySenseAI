from .models import book
from django import forms

class PDFUploadForm(forms.ModelForm):
    class Meta:
        model = book
        fields = ["name", "category", "file"]