from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'description',
            'priority',
            'is_checked'
        )
        model = Todo
        partial = True