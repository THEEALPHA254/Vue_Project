from rest_framework import serializers
from .models import Brand, Category, Product, WooProduct, FileUpload

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# class WooProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WooProduct
#         fields = '__all__'

class UploadSerializer(serializers.Serializer):
    selected_ids = serializers.ListField(allow_null=True,required=False)

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = '__all__'
