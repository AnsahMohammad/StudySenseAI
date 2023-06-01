from django.urls import path
from tracker import views

urlpatterns = [
    path("", views.upload_pdf, name="home"),
    path("display/<int:pk>/", views.view_book, name="display"),
    path("record/", views.record_time, name="record_time"),
]
