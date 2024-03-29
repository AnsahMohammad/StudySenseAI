"""
App module for the client_worker app
"""
from django.apps import AppConfig


# pylint: disable=R0903
class ClientWorkerConfig(AppConfig):
    """WorkerConfig function"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "client_worker"
