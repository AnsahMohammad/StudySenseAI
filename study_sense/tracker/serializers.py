"""
Module study_sense.tracker.serializers
"""

from rest_framework import serializers
from .models import Category, Book, TimeTracking

# pylint: disable=R0903
class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model.
    """

    class Meta:
        """
        Meta class for CategorySerializer.
        """
        model = Category
        fields = ("id", "name", "total_time")


class BookSerializer(serializers.ModelSerializer):
    """
    Serializer for Book model.
    """

    class Meta:
        """
        Meta class for BookSerializer.
        """
        model = Book
        fields = ("id", "name", "category", "file", "created_at", "total_time")


class TimeTrackingSerializer(serializers.ModelSerializer):
    """
    Serializer for TimeTracking model.
    """

    class Meta:
        """
        Meta class for TimeTrackingSerializer.
        """
        model = TimeTracking
        fields = "__all__"
