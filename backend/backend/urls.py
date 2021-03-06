"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from diagnosis import views

urlpatterns = [
    path('api/phenotype/<slug:pattern>', views.phenotype_suggestion, name='phenotype_suggestion'),
    path('api/pheno_quest', views.phenotype_list, name='phenotype_list'),
    path('api/pheno_diagnostic', views.percentage_phenotype_list, name='percentage_phenotype_list'),
    path('admin/', admin.site.urls),
]
