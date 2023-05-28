from django.shortcuts import render, redirect
from .forms import PDFUploadForm

def upload_pdf(request):
    if request.method == 'POST':
        form = PDFUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('upload_pdf')
    else:
        form = PDFUploadForm()
    return render(request, 'upload_pdf.html', {'form': form})
