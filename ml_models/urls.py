from django.urls import path
from . import views

urlpatterns = [
    path('random-forest/', views.random_forest, name="random-forest"),
]
