from django.urls import path
from client_worker import views

urlpatterns = [
    path('register', views.register_user, name='register_user'),
]
