from django.contrib import admin
from .models import Income, Expense, Budget
from django.contrib.auth.models import User


class IncomeAdmin(admin.ModelAdmin):
    list_display = ('subject','id', 'income', 'date', 'user', 'description')

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('subject','id', 'expense', 'date', 'user', 'description', 'expense_type')   

class BudgetAdmin(admin.ModelAdmin):
    list_display = ('id', 'user',
                   'necessities', 'wants', 'savings_debt_payments', 'title') 

   
admin.site.register(Income, IncomeAdmin)
admin.site.register(Expense, ExpenseAdmin)
admin.site.register(Budget, BudgetAdmin)



