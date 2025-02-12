from django.urls import path
from .views import *


urlpatterns = [

    path('register/', RegistrationView.as_view(), name='registration'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('posts/', PostListView.as_view(), name='post-list'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
    path('posts/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('posts/create/', PostCreateView.as_view(), name='post-create'),
    path('comments/', CommentPost.as_view(),name='post-comments'),
    path('comments/view/', CommentView.as_view(),name='view-comments'),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail')
]
