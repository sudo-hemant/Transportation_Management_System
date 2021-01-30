from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path('admin/', admin.site.urls),
    path( '', include('wayBill.urls') ),
    path('api/auth/', include('accounts.api.urls')),

]