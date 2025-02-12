from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Post, Comment
from django.contrib.auth.hashers import make_password

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    name = serializers.CharField()
    email = serializers.EmailField()
    date_of_birth = serializers.DateField()
    gender = serializers.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])

    def validate(self, attrs):

        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Passwords do not match!")
        attrs.pop('confirm_password')
        return attrs

    def create(self, validated_data):

        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        name = validated_data.pop('name')
        date_of_birth = validated_data.pop('date_of_birth')
        gender = validated_data.pop('gender')


        user = User.objects.create_user(
            username = username,
            email = email,
            password = password
        )

        UserProfile.objects.create(
            user=user,
            name=name,
            date_of_birth=date_of_birth,
            gender=gender,
            email=email
        )

        return user

    def to_representation(self, instance):
        user_profile = instance.userprofile
        return {
            "id": instance.id,
            "username": instance.username,
            "email": instance.email,
            "name": user_profile.name,
            "date_of_birth": user_profile.date_of_birth,
            "gender": user_profile.gender,
        }

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this username does not exist.")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password.")

        return {
            'id': user.id,
            'username' : username,
            'password': password
        }

class UserProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username', read_only=True)
    password = serializers.CharField(source='user.password', read_only=True)
    class Meta:
        model = UserProfile
        fields = ['name', 'email', 'gender', 'date_of_birth', 'user', 'username', 'password']

class PostSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(required=False)
    created_by = UserProfileSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'image', 'content', 'created_by']
        read_only_fields = ['created_by']

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['name', 'email', 'comment', 'post']

