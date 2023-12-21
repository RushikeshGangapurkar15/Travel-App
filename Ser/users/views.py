from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, BlogSerializer, FavoriteSerializer, UserProfileSerializer
from rest_framework import viewsets, status
from .models import User, Blog, Favorite, UserProfile
import jwt,datetime
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Create your views here.

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    parser_classes = (MultiPartParser, FormParser)

    @action(detail=False, methods=['post'])
    # @authentication_classes([YourJWTAuthenticationClass])
    # @permission_classes([IsAuthenticated])
    def create_blog(self, request):
        serializer = BlogSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        
            if 'image' in request.data:
                serializer.validated_data['image'] = request.data['image']
            if 'video' in request.data:
                serializer.validated_data['video'] = request.data['video']

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    # @authentication_classes([YourJWTAuthenticationClass])
    # @permission_classes([IsAuthenticated])
    def update_blog(self, request, pk=None):
        blog_id = self.kwargs['pk']
        blog = self.get_object(id = blog_id)
        serializer = BlogSerializer(blog, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    # @authentication_classes([YourJWTAuthenticationClass])
    # @permission_classes([IsAuthenticated])
    def delete_blog(self, request, pk=None):
        try:
            blog = Blog.objects.get(pk=pk)
            blog.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Blog.DoesNotExist:
            return Response({'detail': 'Blog not found.'}, status=status.HTTP_404_NOT_FOUND)



class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]  # Set the permission class to IsAuthenticated

    @action(detail=False, methods=['post'])
    def add_to_favorites(self, request, blog_id, user_id = None, *args, **kwargs):
        try:
            user_id = int(user_id)
            blog_id = int(blog_id)
            blog = Blog.objects.get(pk=blog_id)
            favorite, created = Favorite.objects.get_or_create(user=request.user, blog=blog)
            return Response({'message': 'Added to favorites'}, status=status.HTTP_200_OK)
        except Blog.DoesNotExist:
            return Response({'detail': 'Blog not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['delete'])
    def remove_from_favorites(self, request, blog_id):
        try:
            blog = Blog.objects.get(pk=blog_id)
            favorite = Favorite.objects.get(user=request.user, blog=blog)
            favorite.delete()
            return Response({'message': 'Removed from favorites'}, status=status.HTTP_204_NO_CONTENT)
        except Favorite.DoesNotExist:
            return Response({'detail': 'Favorite not found.'}, status=status.HTTP_404_NOT_FOUND)





class TopBlogsView(APIView):
    def get(self, request):
       
        top_blogs = Blog.objects.order_by('-favorites')[:10] # Get the top 10 blogs
        
        serializer = BlogSerializer(top_blogs, many=True)
        return Response(serializer.data)
    


        

#***user***#
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response



class UserProfileView(UpdateAPIView):
    queryset = User.objects.all()  # Use the User model
    serializer_class = UserProfileSerializer

    def patch(self, request, *args, **kwargs):
        user_id = self.kwargs['pk']  # Retrieve the user's ID from the URL
        user = User.objects.get(id=user_id)
        serializer = UserProfileSerializer
        # token = request.COOKIES.get('jwt')
        # Check if the user making the request is the same as the user to be updated

        
        # if not request.user == user:
        #     return Response({'detail': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        # try:
        #     payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        # except jwt.ExpiredSignatureError:
        #     raise AuthenticationFailed('Unauthenticated!')
        # user = User.objects.filter(id=payload['id']).first()
        
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    



class UserProfileView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user_id = self.kwargs['pk']  # Retrieve the user's ID from the URL
        user = User.objects.get(id=user_id)

        # Check if the user making the request is the same as the user to be updated
        if user != self.request.user:
            return Response({'detail': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)



# class UserProfileView(APIView):
#     def patch(self, request, pk):  # Add 'pk' as a parameter
#         if request.user.is_authenticated and str(request.user.id) == pk:  # Ensure the user ID matches the authenticated user
#             user_profile, created = UserProfile.objects.get_or_create(user=request.user)
            
#             serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             raise AuthenticationFailed('Unauthenticated!')




class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


# class LogoutView(APIView):
#     def post(self, request):
#         token = request.COOKIES.get('jwt')

#         if not token:
#             raise AuthenticationFailed('Unauthenticated!')

#         try:
#             payload = jwt.decode(token, 'secret', algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('Unauthenticated!')
        
#         user = User.objects.filter(id=payload['id']).first()
#         response = Response()
#         response.delete_cookie('jwt')
#         response.data = {
#             'message': 'success'
#         }
#         return response