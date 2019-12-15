from django.db import models

# Create your models here.

class Disorder(models.Model):
    identifier = models.IntegerField()
    orphanumber = models.CharField(max_length=120,unique=True)
    name = models.CharField(max_length=120)

class Phenotype(models.Model):
    identifier = models.IntegerField()
    term = models.CharField(max_length=120)
    orphanumber = models.CharField(max_length=120,unique=True)

class Frequency(models.Model):
    orphanumber = models.CharField(max_length=120,unique=True)
    text = models.CharField(max_length=120)

class Disorder_Phenotype(models.Model):
    disorder_orphanumber = models.ForeignKey(Disorder, on_delete=models.CASCADE)
    phenotype_orphanumber = models.ForeignKey(Phenotype, on_delete=models.CASCADE)
    frequency_orphanumber = models.ForeignKey(Frequency, on_delete=models.CASCADE)
