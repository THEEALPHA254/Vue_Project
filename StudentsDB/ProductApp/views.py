# views.py

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from woocommerce import API

# Brand Views
@api_view(['GET', 'POST'])
def brand_list(request):
    if request.method == 'GET':
        brands = Brand.objects.all()
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = BrandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def brand_detail(request, pk):
    try:
        brand = Brand.objects.get(pk=pk)
    except Brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BrandSerializer(brand)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BrandSerializer(brand, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        brand.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Category Views
@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Product Views
@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def upload_file(request):
    if request.method == 'POST':
        file = request.FILES.get('file_url')
        uploaded_file = FileUpload(file_url=file)
        uploaded_file.save()
        # Generate the absolute URL using request.build_absolute_uri()
        file_url = uploaded_file.file_url.url
        file_absolute_url = request.build_absolute_uri(file_url)
        file_absolute_url=file_absolute_url.replace("http://","http://")

        file_url = uploaded_file.file_url.url
        return Response({'Success': 'True', 'Code': 200, 'message': 'Successful' ,'file_url': file_absolute_url,}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def AddProductToWoo(request):
    if request.method == 'POST':
        serializer = UploadSerializer(data=request.data)
        if serializer.is_valid():
            product_data = serializer.validated_data["selected_ids"]
            for id in product_data:
                product = Product.objects.get(pk=id)
                name = product.name
                

                wcapi = API(
                    url="https://emmerce.co.ke/test",
                    consumer_key="ck_884ad6f537249d074d83b61926107676bda487ae",
                    consumer_secret="cs_7168f43ac95297f908708eeaf2d0a7f01f9d220c",
                    wp_api=True,
                    version="wc/v3"
                )

                data = {
                    "name": name,
                    "sku": product.sku,
                    "type": "simple",
                    "regular_price": str(product.price),
                    "selling_price": str(product.selling_price),
                    "description": product.description,
                    # "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    "categories": [
                        {
                            "id": product.category.id
                        },
                    ],
                    "brands":[
                        {
                            "id": product.brand.id
                        }
                    ],
                    "images": [
                        {
                            "src": "https://m.media-amazon.com/images/I/81EutCnwcpL._SL1500_.jpg"
                        }
                    ]
                }

                print(wcapi.post("products", data).json())

            return Response({"status": "success", "message": "Products added successfully."})
        else:
            return Response(serializer.errors, status=400)
    return Response({"error": "Invalid request method."}, status=405)
            

        #     # WooCommerce API credentials
        #     consumer_key = 'ck_884ad6f537249d074d83b61926107676bda487ae'
        #     consumer_secret = 'cs_7168f43ac95297f908708eeaf2d0a7f01f9d220c'
        #     url = 'https://emmerce.co.ke/test/wp-json/wc/v3/Products'

        #     response = request.post(
        #         url,
        #         auth=(consumer_key, consumer_secret),
        #         json=product_data
        #     )

        #     if response.status_code == 201:
        #         return Response(response.json(), status=status.HTTP_201_CREATED)
        #     return Response(response.json(), status=response.status_code)

        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
