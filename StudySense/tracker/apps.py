"""
App Module for tracker app
"""
from django.apps import AppConfig


class TrackerConfig(AppConfig):
    """App config"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "tracker"
