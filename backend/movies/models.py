from django.db import models


# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=60, blank=False, default='')
    releaseDate = models.CharField(max_length=10, blank=False, default='')
    genre = models.CharField(max_length=20, blank=False, default='')
    price = models.DecimalField(blank=False, decimal_places=2, max_digits = 10)
    rating = models.DecimalField(blank=False, decimal_places=0, max_digits = 2)


