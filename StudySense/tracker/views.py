from django.shortcuts import render, redirect, Http404
from .models import Book, Category

def upload_pdf(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        category_id = request.POST.get('cat') 
        file = request.FILES.get('myfile')

        category_ = Category.objects.get(id=category_id)
        new_book = Book.objects.create(
            name=name,
            category=category_,
            file=file
        )
        return redirect('display', pk=new_book.pk)
    categories = Category.objects.all()
    return render(request, 'upload_pdf.html', {"categories": categories})

def view_book(request, pk):
    pdf = Book.objects.get(pk=pk)
    return render(request, 'display.html', {'pdf': pdf, 'name':pdf.name, 'created':pdf.created_at, 'cat':pdf.category})