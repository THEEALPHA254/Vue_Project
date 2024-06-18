from django.db import models

class Student(models.Model):
    studentName = models.CharField(max_length=100)
    course = models.CharField(max_length=20)
    department = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.studentName
