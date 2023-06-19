"""
View module for tracker app
"""
from django.shortcuts import render, redirect
from .models import Book, Category


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
        return redirect("display", pk=new_book.pk)
    categories = Category.objects.all()
    return render(request, "home.html", {"categories": categories})


def view_book(request, pk):
    """View which allows to view the PDF"""
    pdf = Book.objects.get(pk=pk)
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
