from django.db import models
from django.contrib.auth.models import User
from django.db.models import Count, Sum, Func, F
from django.db.models.functions import TruncMonth
import datetime



class Expense(models.Model):
    necessities = 'NEC'
    wants = 'WNT'
    savings_debt_payments = 'SDP'

    EXPENSE_TYPE_CHOICES = [
        (necessities, 'necessities'),
        (wants, 'wants'),
        (savings_debt_payments, 'savings and debt payments')
    ]

    expense = models.DecimalField(null=False, max_digits=20, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=False, auto_now=False, null=False)
    description = models.TextField(max_length=360, default='')
    subject = models.CharField(max_length=32, default='')
    expense_type = models.CharField(max_length=3, choices=EXPENSE_TYPE_CHOICES, default=necessities)

    def __str__(self):
        return self.subject
 
    

class Income(models.Model):
    income = models.DecimalField(null=False, max_digits=20, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)   
    date = models.DateField(auto_now_add=False, auto_now=False, null=False)
    description = models.TextField(max_length=360, default='')
    subject = models.CharField(max_length=32, default='')

 

    def __str__(self):
        return self.subject
 

class Month(Func):
    function = 'EXTRACT'
    template = '%(function)s(MONTH from %(expressions)s)'
    output_field = models.IntegerField()

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    necessities = models.PositiveIntegerField(null=False)
    wants = models.PositiveIntegerField(null=False)
    savings_debt_payments = models.PositiveIntegerField(null=False) 
    title = models.CharField(max_length=32, default='')


    def __str__(self):
        return self.title
    


