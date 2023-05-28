from django.shortcuts import render, redirect
from django.conf import settings
from .forms import PDFUploadForm
from .models import book

def upload_pdf(request):
    if request.method == 'POST':
        form = PDFUploadForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.save()
            return redirect('display', pk=file.pk)
    else:
        form = PDFUploadForm()
    return render(request, 'upload_pdf.html', {"form": form})

def view_book(request, pk):
    pdf = book.objects.get(pk=pk)
    return render(request, 'display.html', {'pdf': pdf, 'name':pdf.name, 'created':pdf.created_at, 'cat':pdf.category})