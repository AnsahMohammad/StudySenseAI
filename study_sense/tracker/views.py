"""
View module for tracker app
"""
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Book, Category
from .serializers import CategorySerializer


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
def fetch_categories(request):
    """View to fetch all categories"""
    user = request.user
    categories = Category.objects.filter(user=user)
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
