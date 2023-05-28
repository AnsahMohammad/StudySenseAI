from django.db import models

# Create your models here.
class category(models.Model):
    name = models.CharField(max_length=50, null=False)

class book(models.Model):
    name = models.CharField(max_length=50, null=False)
    category = models.CharField(max_length=50, null=False)
    file = models.FileField(upload_to='storage/')
    created_at = models.DateTimeField(auto_now_add=True)
