from django.urls import path
from client_worker import views

urlpatterns = [
    path('login', views.login_user, name='login'),
    path('register', views.register_user, name='register'),
]
