"""
View handler for the client_worker app
"""
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer


# pylint: disable=E1101
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    """View to register users"""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        account = serializer.save()
        token, _ = Token.objects.get_or_create(user=account)
        response_data = {"user": serializer.data, "token": token.key}
        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    """View to verify the user login"""
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        token = Token.objects.get_or_create(user=user)[0].key
        response_data = {
            "message": "Login successful.",
            "username": user.username,
            "email": user.email,
            "token": token,
        }
        return Response(response_data, status=status.HTTP_200_OK)
    return Response(
        {"message": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST"])
def logout_user(request):
    """View to logout the user"""
    logout(request)
    return Response({"message": "Logout successful."})
