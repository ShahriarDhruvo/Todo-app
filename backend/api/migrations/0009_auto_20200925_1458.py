# Generated by Django 3.0.7 on 2020-09-25 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20200925_1450'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateTimeField(default='2020-09-25 14:58'),
        ),
    ]