from django.urls import path
from tracker import views

urlpatterns = [
    path('', views.upload_pdf, name='upload_pdf'),
    path('display/<int:pk>/', views.view_book, name='display'),
]
