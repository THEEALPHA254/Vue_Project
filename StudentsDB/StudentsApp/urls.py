# StudentsApp/urls.py
from django.urls import path
from . import views
from . import loginViews

urlpatterns = [
    path('students/', views.students, name='students'),
    path('student/<int:pk>/', views.student, name='student'), 
    path('register/', loginViews.RegisterView.as_view(), name='register'),
    path('login/', loginViews.LoginView.as_view(), name='login'),
    path('users/', loginViews.UserListView.as_view(), name='user-list'),
]
