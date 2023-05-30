from .models import Book
from django import forms

class PDFUploadForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ["name", "category", "file"]