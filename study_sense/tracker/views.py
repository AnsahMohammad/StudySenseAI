"""
View module for tracker app
"""
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Book, Category
from django.contrib.auth.models import User
from .serializers import CategorySerializer, BookSerializer


# pylint: disable=E1101
def upload_pdf(request):
    """View which takes the input from the form and stores in Db"""
    if request.method == "POST":
        name = request.POST.get("name")
        category_name = request.POST.get("cat")
        try:
            category_ = Category.objects.get(name=category_name)
        except Category.DoesNotExist:
            category_ = Category.objects.create(name=category_name)
        file = request.FILES.get("myfile")
        new_book = Book.objects.create(name=name, category=category_, file=file)
        return redirect("display", book_id=new_book.pk)
    categories = Category.objects.all()
    return render(request, "home.html", {"categories": categories})


def view_book(request, book_id):
    """View which allows to view the PDF"""
    pdf = Book.objects.get(pk=book_id)
    return render(
        request,
        "display.html",
        {"pdf": pdf, "name": pdf.name, "created": pdf.created_at, "cat": pdf.category},
    )


def record_time(request):
    """View which stores the time of each category"""
    if request.method == "POST":
        time_spent = float(request.POST.get("time_spent")) / 1000
        file_name = request.POST.get("name")
        file = Book.objects.get(name=file_name)
        file.total_time += time_spent
        file.save()
        cat = file.category
        cat.total_time += time_spent
        cat.save()
    categories = Category.objects.all()
    return render(request, "home.html", {"categories": categories})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def fetch_categories(request):
    """View to fetch all categories"""
    username = request.user
    print(f"{username} is requesting categories")
    user = User.objects.get(username=username)
    categories = Category.objects.filter(user=user)
    category_data = {}

    for category in categories:
        books = Book.objects.filter(category=category)
        book_serializer = BookSerializer(books, many=True)
        category_data[category.name] = book_serializer.data

    serializer = CategorySerializer(categories, many=True)
    response_data = {"categories": serializer.data, "category_data": category_data}
    return Response(response_data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def reg_category(request):
    username = request.user
    category_name = request.data.get("category")
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"message": "Invalid username"}, status=400)

    existing_category = Category.objects.filter(user=user, name=category_name).exists()
    if existing_category:
        return Response({"message": "Category already exists for the user"}, status=400)
    if len(category_name) > 0:
        category = Category.objects.create(name=category_name, user=user)
        return Response({"message": "Added category successfully"}, status=200)

    return Response({"message": "Invalid category name"}, status=400)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def add_file(request):
    form_data = request.POST
    username = request.user
    file_name = form_data.get("name")
    category_name = form_data.get("cat")
    uploaded_file = request.FILES.get("myfile")
    print(f"{username} is adding a file {file_name} into {category_name}")
    try:
        user = User.objects.get(username=username)
        category = Category.objects.get(name=category_name, user=user)
    except Category.DoesNotExist:
        return Response({"message": "Invalid category"}, status=400)
    except User.DoesNotExist:
        return Response({"message": "Invalid username"}, status=400)
    book = Book.objects.create(
        name=file_name, category=category, file=uploaded_file, user=user
    )
    return Response({"message": "File added successfully"}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def delete_file(request):
    username = request.user
    file_name = request.data.get("file_name")
    print(f"{username} is deleting file {file_name}")

    try:
        user = User.objects.get(username=username)
        book = Book.objects.get(name=file_name, user=user)
        # Delete the file
        book.file.delete()
        book.delete()

        return Response({"message": "File deleted successfully"}, status=200)
    except User.DoesNotExist:
        return Response({"message": "Invalid username"}, status=400)
    except Book.DoesNotExist:
        return Response({"message": "File not found"}, status=400)
    except Exception as e:
        return Response({"message": str(e)}, status=500)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def delete_category(request):
    username = request.user
    category_name = request.data.get("category_name")
    print(f"{username} is deleting category {category_name}")

    try:
        user = User.objects.get(username=username)
        category = Category.objects.get(name=category_name, user=user)
        # Delete all books associated with the category
        books = Book.objects.filter(category=category)
        for book in books:
            book.file.delete()
            book.delete()

        # Delete the category
        category.delete()

        return Response({"message": "Category deleted successfully"}, status=200)
    except User.DoesNotExist:
        return Response({"message": "Invalid username"}, status=400)
    except Category.DoesNotExist:
        return Response({"message": "Category not found"}, status=400)
    except Exception as e:
        return Response({"message": str(e)}, status=500)
