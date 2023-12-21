from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator

class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='images/blog_images/', blank=True, validators=[FileExtensionValidator(['jpg', 'png', 'jpeg'])] )
    video = models.FileField(upload_to='videos/blog_videos/', blank=True, validators=[FileExtensionValidator(['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', '3gp', 'webm'])]   )
    favorites = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# Create your models here.
class User(AbstractUser):
    
    name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    phone_number = models.IntegerField(max_length=10, blank=True, null=True)
    about = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='images/blogcover_image/', blank=True, validators=[FileExtensionValidator(['jpg', 'png', 'jpeg'])], default='images/blogcover_image/default.jpeg')
    profile_image = models.FileField(upload_to='images/profile_image/', blank=True, validators=[FileExtensionValidator(['jpg', 'png', 'jpeg'])], default='images/profile_image/default.jpeg')

    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
# models.py
class UserProfile(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    phone_number = models.IntegerField(blank=True)
    about = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='images/blogcover_image/', blank=True, validators=[FileExtensionValidator(['jpg', 'png', 'jpeg'])])
    profile_image = models.FileField(upload_to='images/profile_image/', blank=True, validators=[FileExtensionValidator(['jpg', 'png', 'jpeg'])])

class Favorite(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} - {self.blog.title}'