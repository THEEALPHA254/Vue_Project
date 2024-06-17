# Generated by Django 5.0.6 on 2024-06-17 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('StudentName', models.CharField(max_length=100)),
                ('Course', models.CharField(max_length=20)),
                ('Department', models.CharField(max_length=100)),
                ('Email', models.EmailField(max_length=254)),
            ],
        ),
    ]
