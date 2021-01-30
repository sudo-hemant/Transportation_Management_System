from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import BillList, BillIdsList, ContractsList, CustomerList,\
                    GenerateBillList, CustomerNameList, ListGenerateBillList


router = DefaultRouter()
router.register('bill', BillList)
router.register('contract', ContractsList)
router.register('customer', CustomerList)
router.register('generatebill', GenerateBillList)
router.register('listgeneratebill', ListGenerateBillList)

urlpatterns = [
    path("billids/", BillIdsList.as_view(), name="bill-ids"),
    path("customersname/", CustomerNameList.as_view(), name="customers-name"),


    # path("testing/", Testing.as_view()),

]
urlpatterns += router.urls