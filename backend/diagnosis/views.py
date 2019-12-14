from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from diagnosis.models import *
from django.db import models
import json

def phenotype_suggestion(request, pattern):
    phenotypes = Phenotype.objects.all()


    return HttpResponse(data, content_type='application/json')

def phenotype_list(request):
    list_phenos = ['HP:0004322', 'HP:0001250', 'HP:0001249']
    list_obj = None

    for pheno in list_phenos:
        if list_obj == None:
            list_obj = Disorder.objects.filter(disorder_phenotype__phenotype_orphanumber__orphanumber__exact = pheno)
        else:
            list_obj = (list_obj & Disorder.objects.filter(disorder_phenotype__phenotype_orphanumber__orphanumber__exact = pheno))

    data = json.dumps(len(list_obj))
    return HttpResponse(data, content_type='application/json')




# Create your views here.
