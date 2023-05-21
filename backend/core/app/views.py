from django.shortcuts import render
from django.views import View
from django.http import HttpResponse


# Create your views here.
class Home(View):
    def get(self, request):
        return HttpResponse(
            "hello this is navid azimi and he is making the best menu creator app on the market"
        )
