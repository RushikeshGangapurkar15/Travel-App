from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, UserView, LogoutView, BlogViewSet, UserProfileView, FavoriteViewSet, TopBlogsView

router = DefaultRouter()
router.register(r'blogs', BlogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    # path('update-profile', UserProfileView.as_view(), name='update-profile'),
    path('update-profile/<int:pk>/', UserProfileView.as_view(), name='update-profile'),
    path('users/<int:user_id>/favorites/add/<int:blog_id>/', FavoriteViewSet.as_view({'post': 'add_to_favorites'}), name='add-to-favorites'),
    path('users/<int:user_id>/favorites/remove/<int:blog_id>/', FavoriteViewSet.as_view({'delete': 'remove_from_favorites'}), name='remove-from-favorites'),
    path('top-blogs/', TopBlogsView.as_view(), name='top-favorite-blogs'),
]

