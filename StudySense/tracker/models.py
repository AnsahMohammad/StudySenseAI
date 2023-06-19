"""
Model Module for tracker app.
Defines the model for category and Book
"""
from django.db import models


# Create your models here.
class Category(models.Model):
    """Model to store Category of the PDF"""

    name = models.CharField(max_length=50, null=False)
    total_time = models.FloatField(default=0)


class Book(models.Model):
    """Model to store the PDF"""

    name = models.CharField(max_length=50, null=False, blank=False)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, null=False, blank=False
    )
    file = models.FileField()
    created_at = models.DateTimeField(auto_now_add=True)
    total_time = models.FloatField(default=0)
