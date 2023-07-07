"""
View module for tracker app
"""
from datetime import datetime, timedelta
from django.shortcuts import render, redirect
from django.db.models import F
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Book, Category, TimeTracking
from django.contrib.auth.models import User
from .serializers import CategorySerializer, BookSerializer, TimeTrackingSerializer


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


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def categories(request):
    """View to fetch all categories or add a new category"""
    if request.method == "GET":
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

    elif request.method == "POST":
        username = request.user
        category_name = request.data.get("category")
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"message": "Invalid username"}, status=400)

        existing_category = Category.objects.filter(
            user=user, name=category_name
        ).exists()
        if existing_category:
            return Response(
                {"message": "Category already exists for the user"}, status=400
            )
        if category_name and len(category_name) > 0:
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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def track_time(request):
    try:
        user = request.user
        book_path = request.data.get("book_path")
        start_time_str = request.data.get("start_time")
        end_time_str = request.data.get("end_time")

        # Pre-processing
        start_time = datetime.fromisoformat(start_time_str[:-1])
        end_time = datetime.fromisoformat(end_time_str[:-1])
        book_path = book_path.replace("/media/", "")

        print(
            f"{user.username} finished reading {book_path} in {end_time - start_time}"
        )

        book = Book.objects.get(file=book_path, user=user)
        time_spent = (end_time - start_time).total_seconds() / 60.0

        # Update the total_time of the book and its category
        book.total_time = F("total_time") + time_spent
        category = Category.objects.get(id=book.category_id)
        category.total_time = F("total_time") + time_spent
        category.save()
        book.save()

        time_tracking = TimeTracking.objects.create(
            user=user,
            book=book,
            start_time=start_time,
            end_time=end_time,
        )

        serializer = TimeTrackingSerializer(time_tracking)

        return Response(serializer.data, status=201)
    except Book.DoesNotExist:
        return Response({"message": "Invalid book"}, status=400)
    except Exception as e:
        return Response({"message": str(e)}, status=500)


# in the future can make all the chart fetch within one view
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_category_history(request):
    """
    returns the past 7 day history category-wise
    """
    username = request.user
    user = User.objects.get(username=username)
    categories = Category.objects.filter(user=user)

    data = {"history": {}}

    # Set the date range for the past 7 days
    today = datetime.now().date()
    date_range = [today - timedelta(days=i) for i in range(7)]

    for category in categories:
        category_data = []

        for date in date_range:
            # Filter time trackings for the specific category and date
            time_trackings = TimeTracking.objects.filter(
                book__category=category, start_time__date=date
            )
            total_time = sum(
                (tracking.end_time - tracking.start_time).total_seconds() / 3600
                for tracking in time_trackings
            )
            category_data.append(round(total_time, 2))

        # Add the category data to the response
        data["history"][category.name] = category_data

    return Response(data, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_cat_history(request):
    """
    returns time spent on each category
    """
    username = request.user
    user = User.objects.get(username=username)
    categories = Category.objects.filter(user=user)

    data = {}

    for category in categories:
        data[category.name] = category.total_time

    return Response(data, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_daily_history(request):
    """
    returns the daily time spend
    """
    username = request.user
    user = User.objects.get(username=username)

    # to store data of each day
    data = []

    # Set the date range for the past 7 days
    today = datetime.now().date()
    date_range = [today - timedelta(days=i) for i in range(7)]

    for date in date_range:
        time_trackings = TimeTracking.objects.filter(start_time__date=date, user=user)
        total_time = sum(
            (tracking.end_time - tracking.start_time).total_seconds() / 3600
            for tracking in time_trackings
        )
        data.append(round(total_time, 1))

    return Response({"timeline": data}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_top_reads(request):
    """
    Returns the daily time spent on top reads.
    """
    try:
        user = User.objects.get(username=request.user)
        data = {}
        books = Book.objects.filter(user=user)

        for book in books:
            data[book.name] = book.total_time

        if len(data) < 2:
            return Response(
                {"top_reads": ["File1", "File2"], "message": "Add more files"},
                status=200,
            )

        new_data = list(dict(sorted(data.items(), key=lambda x: x[1])).keys())
        data = new_data[: min(3, len(new_data))]
        series = [10*(len(data)-i) for i in range(len(data))]

        return Response({"top_reads": data, "series": series}, status=200)

    except Exception as e:
        return Response({"message": str(e)}, status=400)
