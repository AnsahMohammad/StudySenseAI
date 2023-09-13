"""
App Module for tracker app
"""
from django.apps import AppConfig


# pylint: disable=R0903
class TrackerConfig(AppConfig):
    """App config"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "tracker"
