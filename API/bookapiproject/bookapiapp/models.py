from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE,null=True, blank=True)
    name = models.CharField(max_length=20, null=True, blank=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    email = models.EmailField(unique=True)

    def __str__(self):

        return self.name

class Post(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='media/', null=True, blank=True)
    content = models.TextField()
    created_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="posts")

    def __str__(self):
        return self.title

class Comment(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    comment = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE,related_name="comments")


    def __str__(self):
        return f"Comment by {self.name} on {self.post.title}"