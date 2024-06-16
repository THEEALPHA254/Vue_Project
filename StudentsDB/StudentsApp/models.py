from django.db import models

class Student(models.Model):
    StudentName = models.CharField(max_length=100)
    Course = models.CharField(max_length=20)
    Department = models.CharField(max_length=100)
    Email = models.EmailField()

    def __str__(self):
        return self.StudentName
