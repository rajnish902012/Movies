from django.urls import re_path
from movies import views

urlpatterns = [
    re_path(r'^api/movies$', views.movie_list),
    re_path(r'^api/movies/(?P<pk>[0-9]+)$', views.movie_detail),
    re_path(r'^api/genre$', views.genre_list)
]
