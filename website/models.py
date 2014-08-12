from django.db import models

class Gig(models.Model):
    venue=models.CharField(max_length=140)
    website=models.CharField(max_length=140)
    date=models.DateTimeField()
    location=models.CharField(max_length=140)
    band=models.CharField(max_length=240)

class News(models.Model):
    news=models.TextField()
