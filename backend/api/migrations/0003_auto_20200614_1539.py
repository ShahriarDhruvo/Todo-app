# Generated by Django 3.0.7 on 2020-06-14 15:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200614_1530'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Tasks',
            new_name='Task',
        ),
        migrations.RenameModel(
            old_name='Works',
            new_name='Work',
        ),
    ]
