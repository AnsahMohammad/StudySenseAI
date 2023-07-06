"""
Model Module for tracker app.
Defines the model for category and Book
"""
from django.contrib.auth.models import User
from django.db import models


# pylint: disable=R0903
class Category(models.Model):
    """Model to store Category of the PDF"""

    name = models.CharField(max_length=50, null=False)
    total_time = models.FloatField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Book(models.Model):
    """Model to store the PDF"""

    name = models.CharField(max_length=50, null=False, blank=False)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, null=False, blank=False
    )
    file = models.FileField()
    created_at = models.DateTimeField(auto_now_add=True)
    total_time = models.FloatField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class TimeTracking(models.Model):
    """Model to track time spent by a user on a PDF"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    total_time = models.DurationField(null=True, blank=True, default=0)

    def save(self, *args, **kwargs):
        if self.start_time and self.end_time:
            self.total_time = self.end_time - self.start_time
        super().save(*args, **kwargs)
