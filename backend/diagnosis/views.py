from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
import json

def phenotype_suggestion(request, pattern):
    data_to_dump = [
        { 'name': 'Pheno1', 'id': 123 },
        { 'name': 'Pheno2', 'id': 124 }
    ]

    data = json.dumps(data_to_dump)
    return HttpResponse(data, content_type='application/json')

# Create your views here.
