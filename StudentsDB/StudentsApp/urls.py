from django.urls import path
from . import views


urlpatterns = [
    path('students/', views.students, name='students'),
    path('student/<int:pk>/', views.student, name='student'),
]
