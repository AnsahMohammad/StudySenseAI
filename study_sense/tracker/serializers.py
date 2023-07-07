from rest_framework import serializers
from .models import Category, Book, TimeTracking


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "total_time")


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ("id", "name", "category", "file", "created_at", "total_time")


class TimeTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTracking
        fields = "__all__"
