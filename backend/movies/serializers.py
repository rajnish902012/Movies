from rest_framework import serializers
from datetime import datetime

from movies.models import Movie
from movies.common import All_Genres


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id',
                  'title',
                  'releaseDate',
                  'genre',
                  'price',
                  'rating')

    def validate(self, data):
        title = data['title']
        if len(title) < 3 or len(title) > 60:
            raise serializers.ValidationError({"title": "title length should be between 3 and 60"})
        format_yyyymmdd = '%Y-%m-%d'
        releaseDate = data['releaseDate']
        try:
            print(releaseDate)
            _ = datetime.strptime(releaseDate, format_yyyymmdd)
        except ValueError:
            raise serializers.ValidationError({"releaseDate": "releaseDate should be of format_yyyymmdd format"})
        genre = data['genre']
        if genre not in All_Genres:
            raise serializers.ValidationError({"genre": "genre should be from one of the following: " +  str(All_Genres)})
        price = data['price']
        if price < 0 or price > 1000000:
            raise serializers.ValidationError({"price": "price should be between 0 and 1000000"})
        rating = data['rating']
        if rating < 0 or rating > 10:
            raise serializers.ValidationError({"rating": "rating should be between 0 and 10"})
        return data


