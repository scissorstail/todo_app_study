from django.urls import path
from django.conf.urls import include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from account.views import UserCreateAPIView, UserRetrieveAPIView, ChangePasswordView, UserProfileUpdateView
from todo.views import TodoViewSet

router = DefaultRouter()
router.register('todo', TodoViewSet, basename='todo')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserCreateAPIView.as_view(), name="user"),
    path('user/detail/', UserRetrieveAPIView.as_view(), name="user_detail"),
    path('user/detail_update/', UserProfileUpdateView.as_view(), name="user_detail_update"),
    path('user/change_password/', ChangePasswordView.as_view(), name='user_change_password'),
    path('', include(router.urls)),
]