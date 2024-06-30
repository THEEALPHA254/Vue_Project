# StudentsApp/urls.py
from django.urls import path
from . import views
from . import loginViews

urlpatterns = [
    path('students/', views.students, name='students'),
    path('student/<int:pk>/', views.student, name='student'), 
    path('register/', loginViews.RegisterView, name='register'),
    path('login/', loginViews.LoginView, name='login'),
    path('users/', loginViews.UserListView, name='user-list'),
]
