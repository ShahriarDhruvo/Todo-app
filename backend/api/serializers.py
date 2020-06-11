# Serializers are nothing but a way to convert any python model into json data
# It means to convert the python model into json format by using serializer so that 
# we can pass that around to use in api

from rest_framework import serializers

from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields  = '__all__'