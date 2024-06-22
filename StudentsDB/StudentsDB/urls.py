# StudentDB/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('StudentsApp.urls')),
    path('product_api/', include('ProductApp.urls')),
]
