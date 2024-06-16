from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Student
from .serializers import StudentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET","PUT","DELETE"])
def student(request,pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'GET':
        serializer =StudentSerializer(student)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            context = {
                "success": True,
                "message": "Updated successfully",
                "data": serializer.data,
                "code": 200
            }
            return Response(context, status=status.HTTP_200_OK)
        
        return Response(
            {
                "success": False,
                "message": "Validation error",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST

        )
    elif request.method == "DELETE":
        student.delete()
        return Response({
            "message":"deleted",
            "status":True
        })


@api_view(['GET', 'POST'])
def students(request):
    if request.method == "GET":
        students_queryset = Student.objects.all()
        print('here')
        serializer = StudentSerializer(students_queryset, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            context = {
                "success": True,
                "code": 200

            }
            return Response(context)
        else:
            return Response(serializer.errors)

       
    