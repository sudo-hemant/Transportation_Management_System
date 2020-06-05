from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import BillList, ContractsList, CustomerList,\
                    GenerateBillList, CustomerNameList , AllGenerateBillList


router = DefaultRouter()
router.register('bill', BillList)
router.register('contract', ContractsList)
router.register('customer', CustomerList)
router.register('generatebill', GenerateBillList)


urlpatterns = [
    path("customersname/", CustomerNameList.as_view(), name="customers-name"),
    path("listgeneratebill/<int:pk>/", AllGenerateBillList.as_view(), name="generate-bill-view"),

]
urlpatterns += router.urls