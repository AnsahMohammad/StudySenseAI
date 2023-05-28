from django.urls import path
from .views import upload_pdf

urlpatterns = [
    path('upload-pdf/', upload_pdf, name='upload_pdf'),
]
