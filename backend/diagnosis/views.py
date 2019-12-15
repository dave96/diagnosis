import json

from django.db import models
from django.http import JsonResponse
# from django.shortcuts import render
# from rest_framework import viewsets

from diagnosis.models import Phenotype, Disorder, Disorder_Phenotype
from diagnosis.model import Model

def phenotype_suggestion(request, pattern):
    phenotypes = Phenotype.objects.all()

    return JsonResponse(data)

def phenotype_list(request):
    list_phenos = json.loads(request.body.decode('utf-8'))["phenotypes"]
    list_obj = None

    for pheno in list_phenos:
        if list_obj is None:
            list_obj = Disorder.objects.filter(
                disorder_phenotype__phenotype_orphanumber__orphanumber__exact=pheno)
        else:
            list_obj = (list_obj & Disorder.objects.filter(
                disorder_phenotype__phenotype_orphanumber__orphanumber__exact=pheno))

    list_obj = list_obj.prefetch_related('disorder_phenotype_set', 'disorder_phenotype_set__phenotype_orphanumber')
    # This one works OK also
    # list_obj = list_obj.prefetch_related(models.Prefetch('disorder_phenotype_set', queryset=Disorder_Phenotype.objects.select_related('phenotype_orphanumber').all()))
    projected_diseases = [[dis_pheno.phenotype_orphanumber.orphanumber for dis_pheno in dis.disorder_phenotype_set.all()] for dis in list_obj]

    model = Model('/home/david/Source/diagnosis/data/hp.obo', list_phenos, projected_diseases)
    # return JsonResponse(projected_diseases, safe=False)
    return JsonResponse(model.get_questions(10), safe=False)

def percentage_phenotype_list(request):
    list_phenos = json.loads(request.body.decode('utf-8'))["phenotypes"]
    list_phenos_orig = json.loads(request.body.decode('utf-8'))["phenotypes_orig"]
    list_obj = None

    for pheno in list_phenos_orig:
        if list_obj is None:
            list_obj = Disorder.objects.filter(
                disorder_phenotype__phenotype_orphanumber__orphanumber__exact=pheno)
        else:
            list_obj = (list_obj & Disorder.objects.filter(
                disorder_phenotype__phenotype_orphanumber__orphanumber__exact=pheno))

    list_obj = list_obj.prefetch_related('disorder_phenotype_set', 'disorder_phenotype_set__phenotype_orphanumber')
    projected_diseases = [[dis_pheno.phenotype_orphanumber.orphanumber for dis_pheno in dis.disorder_phenotype_set.all()] for dis in list_obj]
    diseases = [dis.name for dis in list_obj]

    model = Model('/home/david/Source/diagnosis/data/hp.obo', list_phenos, projected_diseases)
    aux1 = model.jaccard_index()
    tlist = [x for x in zip(diseases, aux1)]
    return JsonResponse(tlist, safe=False)

# Create your views here.
