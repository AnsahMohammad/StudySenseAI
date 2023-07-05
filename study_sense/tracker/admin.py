"""
Admin Module for tracker app
"""
from django.contrib import admin
from .models import Book, Category, TimeTracking

# Register your models here.

admin.site.register(Book)
admin.site.register(Category)
admin.site.register(TimeTracking)
