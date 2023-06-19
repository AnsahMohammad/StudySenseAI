"""
Serializer module for the client_worker app
"""
from rest_framework import serializers
from django.contrib.auth.models import User


# pylint: disable=R0903
class UserSerializer(serializers.ModelSerializer):
    """Serializer class"""

    class Meta:
        """Meta Class"""

        model = User
        fields = ("username", "password", "email")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """Serializer generator"""
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            email=validated_data["email"],
        )
        return user
