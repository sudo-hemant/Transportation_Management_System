from django.contrib import admin

from .models import Bill, Contracts, Customer,\
    GenerateBill


admin.site.register(Bill)
admin.site.register(Contracts)
admin.site.register(Customer)
admin.site.register(GenerateBill)