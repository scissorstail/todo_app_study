from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer, ChangePasswordSerializer

import inspect

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

class UserRetrieveAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        #print(user.__dict__)

        return Response({
            'id': user.id,
            'email': user.email,
            'nickname': user.nickname,
        })

class UserProfileUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def perform_update(self, serializer):
        data = self.request.data
        nickname = data.get('nickname', None)
        user_queryset = self.queryset.filter(id=self.request.user.id)

        if nickname is not None:
            user_queryset.update(nickname=nickname)

class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user