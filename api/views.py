from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from .models import Income, Expense, Budget, Month
from .serializers import ExpenseSerializer, IncomeSerializer, UserSerializer, BudgetSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models.functions import TruncMonth
from django.db.models import Avg, Sum
from rest_framework.views import APIView


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )


    def set_user(self, serializer):
        serializer.save(username=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(username=self.request.user)


class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    @action(detail=True, methods=['GET'])
    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        return super().get_permissions()
    
    @action(detail=True, methods=['POST'])
    def get_permissions_2(self):
        if self.request.method == 'POST':
            return []
        return super().get_permissions()

    @action(detail=True, methods=['PUT'])
    def get_permissions_3(self):
        if self.request.method == 'PUT':
            return []
        return super().get_permissions()
    

    # restricts data to logged-in user
    def set_user(self, serializer):
        serializer.save(user_id=self.request.user)
        return self.request.user   

    def get_queryset(self):
        return self.queryset.filter(user_id=self.request.user)



class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )

    def set_user(self, serializer):
        serializer.save(user_id=self.request.user)    

    def get_queryset(self):
        return self.queryset.filter(user_id=self.request.user)    

    @action(detail=True, methods=['GET'])
    def get_permissions_exp(self):
        if self.request.method == 'GET':
            return []
        return super().get_permissions()
    
    @action(detail=True, methods=['POST'])
    def get_permissions_exp2(self):
        if self.request.method == 'POST':
            return []
        return super().get_permissions()

    @action(detail=True, methods=['PUT'])
    def get_permissions_exp3(self):
        if self.request.method == 'PUT':
            return []
        return super().get_permissions()
    
class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )


    def set_user(self, serializer):
        serializer.save(user_id=self.request.user)    

    def get_queryset(self):
        return self.queryset.filter(user_id=self.request.user)

    @action(detail=True, methods=['GET'])
    def get_permissions_exp(self):
        if self.request.method == 'GET':
            return []
        return super().get_permissions()
    
    @action(detail=True, methods=['POST'])
    def get_permissions_exp(self):
        if self.request.method == 'POST':
            return []
        return super().get_permissions()
    

    

    

    
