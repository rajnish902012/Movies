from django.shortcuts import render
from rest_framework.decorators import api_view
from movies.models import Movie
from movies.common import All_Genres
from movies.serializers import MovieSerializer
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

# Create your views here.

@api_view(['GET', 'POST'])
def movie_list(request):
    if request.method == 'POST':
        movie_data = JSONParser().parse(request)
        movie_serializer = MovieSerializer(data=movie_data)
        if movie_serializer.is_valid():
            movie_serializer.save()
            return JsonResponse(movie_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(movie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        movies = Movie.objects.all()
        title = request.GET.get('title', None)
        genre = request.GET.get('genre', None)
        sortColumn = request.GET.get('sortBy', None)
        sortOrder = request.GET.get('sortOrder', 'inc')
        if title is not None:
            movies = movies.filter(title__icontains=title)
        if genre is not None:
            movies = movies.filter(genre=genre)
        if sortColumn is not None:
            if sortOrder == 'desc':
                movies = movies.order_by('-' + sortColumn)
            else:
                movies = movies.order_by(sortColumn)
        movies_serializer = MovieSerializer(movies, many=True)
        return JsonResponse(movies_serializer.data, safe=False)


@api_view(['GET', 'PATCH', 'DELETE'])
def movie_detail(request, pk):
    try:
        movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExist:
        return JsonResponse({'message': 'The movie does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        movie_serializer = MovieSerializer(movie)
        return JsonResponse(movie_serializer.data)
    elif request.method == 'DELETE':
        movie.delete()
        return JsonResponse({'message': 'Movie was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PATCH':
        movie_data = JSONParser().parse(request)
        movie_serializer = MovieSerializer(movie, data=movie_data)
        if movie_serializer.is_valid():
            movie_serializer.save()
            return JsonResponse(movie_serializer.data)
        return JsonResponse(movie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def genre_list(request):
    if request.method == 'GET':
        return JsonResponse({"data": All_Genres}, status=status.HTTP_201_CREATED)


