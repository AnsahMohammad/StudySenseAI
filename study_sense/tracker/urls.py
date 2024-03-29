"""
URL patterns module for tracker app
"""
from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.categories, name="get_categories"),
    path("register_categories/", views.categories, name="reg_categories"),
    path("add_file/", views.add_file, name="add_file"),
    path("delete_file/", views.delete_file, name="delete_file"),
    path("delete_category/", views.delete_category, name="delete_category"),
    path("track_time/", views.track_time, name="track_time"),
    path("data/category_history/", views.get_category_history, name="cat_history"),
    path("data/category_history_pie/", views.get_cat_history, name="cat_history_pie"),
    path("data/timeline_data/", views.get_daily_history, name="timeline"),
    path("data/top_reads/", views.get_top_reads, name="top_reads"),
]
