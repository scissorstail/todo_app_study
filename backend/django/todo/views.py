from rest_framework import viewsets

from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = None

    def get_queryset(self):
        order = self.request.query_params.get('order')
        user_queryset = self.queryset.filter(user=self.request.user)

        if order in ['priority']:
            return user_queryset.order_by(order, 'id')

        return user_queryset.order_by('id')

    def perform_retrive(self):
        return self.queryset.filter(user=self.request.user, id=self.kwargs.get("pk"))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        data = self.request.data
        
        self.queryset.filter(user=self.request.user, id=self.kwargs.get("pk")).update(**data)

    def perform_destroy(self, serializer):
        self.queryset.filter(id=self.kwargs.get("pk")).delete()
