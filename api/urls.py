from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import IncomeViewSet, ExpenseViewSet, UserViewSet, BudgetViewSet


router = routers.DefaultRouter()
router.register('income', IncomeViewSet)
router.register('expense', ExpenseViewSet)
router.register('users', UserViewSet)
router.register('budget', BudgetViewSet)


urlpatterns = [
    path('', include(router.urls)),
]