from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Income, Expense, Budget, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True,
                                     'required': True}}
    
    def create(self, validated_date):
        user = User.objects.create_user(**validated_date)
        Token.objects.create(user=user)
        return user


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'income', 'date', 'user',
                 'description', 'subject')

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'expense', 'date', 'user',
                 'description', 'subject', 'expense_type')

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('id', 'user',
                   'necessities', 'wants', 'savings_debt_payments', 'title',)

