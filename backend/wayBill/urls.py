from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import BillList, BillIdsList, ContractsList, CustomerList,\
                    GenerateBillList, CustomerNameList , AllGenerateBillList,\
                    ListGenerateBillList


router = DefaultRouter()
router.register('bill', BillList)
router.register('contract', ContractsList)
router.register('customer', CustomerList)
router.register('generatebill', GenerateBillList)


urlpatterns = [
    path("billids/", BillIdsList.as_view(), name="bill-ids"),
    path("customersname/", CustomerNameList.as_view(), name="customers-name"),
    path("listgeneratebill/", ListGenerateBillList.as_view(), name="generate-bill-list"),
    path("listgeneratebill/<int:pk>/", AllGenerateBillList.as_view(), name="generate-bill-view"),

]
urlpatterns += router.urls