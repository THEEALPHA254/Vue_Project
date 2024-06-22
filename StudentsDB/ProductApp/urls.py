# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('brands/', views.brand_list, name='brand-list'),
    path('brands/<int:pk>/', views.brand_detail, name='brand-detail'),
    path('categories/', views.category_list, name='category-list'),
    path('categories/<int:pk>/', views.category_detail, name='category-detail'),
    path('products/', views.product_list, name='product-list'),
    path('products/<int:pk>/', views.product_detail, name='product-detail'),
]
