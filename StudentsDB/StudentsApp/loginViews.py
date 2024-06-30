from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.contrib.auth import authenticate

@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def RegisterView(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data.get('username'))
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "Success": "True",
                "Code": 201,
                "Details": {
                    "user": UserSerializer(user).data,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
            },
            status=status.HTTP_201_CREATED,
        )
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def LoginView(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if username and password:
        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "Success": "True",
                    "Code": 200,
                    "Details": {
                        "user": UserSerializer(user).data,
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    },
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "Success": "False",
                    "Code": status.HTTP_400_BAD_REQUEST,
                    "message": "Password and username didn't match",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
    return Response(
        {
            "Success": "False",
            "Code": status.HTTP_400_BAD_REQUEST,
            "message": "Username and password are required",
        },
        status=status.HTTP_400_BAD_REQUEST,
    )

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def UserListView(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
