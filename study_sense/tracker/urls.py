"""
URL patterns module for tracker app
"""
from django.urls import path
from . import views

urlpatterns = [
    path("", views.upload_pdf, name="home"),
    path("display/<int:book_id>/", views.view_book, name="display"),
    path("record/", views.record_time, name="record_time"),
    path("categories/", views.fetch_categories, name="get_categories"),
    path("register_categories/", views.reg_category, name="reg_categories"),
]
