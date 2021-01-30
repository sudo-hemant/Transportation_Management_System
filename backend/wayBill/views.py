
from django.shortcuts import render

from rest_framework import generics, filters, viewsets, permissions
from rest_framework.filters import OrderingFilter, SearchFilter
# from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters

from .models import Bill, Contracts, Customer, GenerateBill
from .serializers import ( 
                            BillSerializer, BillIdsSerializer,
                            ContractSerializer, CustomerSerializer,
                            CustomerNameSerializer, GenerateBillSerializer, 
                            ListGenerateBillSerializer
                        )
from .filters import BillFilter, BillIdsFilter, ContractFilter, \
                        CustomerFilter, GenerateBillFilter



class BillList(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    filter_backends = ( filters.DjangoFilterBackend, SearchFilter )
    filterset_class = BillFilter
    # filterset_fields = ['origin', 'consignee']
    # permission_classes = [permissions.IsAuthenticated]

    # def get_queryset(self):
    #     return self.request.user.doc.all()

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


class ContractsList(viewsets.ModelViewSet):
    queryset = Contracts.objects.all()
    serializer_class = ContractSerializer
    filter_backends = ( filters.DjangoFilterBackend, SearchFilter )
    filterset_class = ContractFilter


class CustomerList(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = ( filters.DjangoFilterBackend, SearchFilter )
    filterset_class = CustomerFilter


class GenerateBillList(viewsets.ModelViewSet):
    queryset = GenerateBill.objects.all()
    serializer_class = GenerateBillSerializer
    filter_backends = ( filters.DjangoFilterBackend, SearchFilter )
    filterset_class = GenerateBillFilter


# ------------------------------------------------------------------------


# to display list of existing bill and filter 
class BillIdsList(generics.ListAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillIdsSerializer
    filter_backends = ( filters.DjangoFilterBackend, SearchFilter )
    filterset_class = BillIdsFilter


# to help display existing customer in autocomplete 
class CustomerNameList(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerNameSerializer


# to see bill in detail and be able to delete it
class ListGenerateBillList(viewsets.ModelViewSet):
    queryset = GenerateBill.objects.all()
    serializer_class = ListGenerateBillSerializer





# class Testing(generics.ListAPIView):
    # queryset = Customer.objects.raw('select id, name, gst_rate from waybill_customer order by id desc limit 1 ') where user==12
#     serializer_class = CustomerSerializer
#     # queryset = Customer.objects.all()
#     # serializer_class = TestingSerializer



# # remove it
# class AllGenerateBillList(generics.RetrieveAPIView):
#     queryset = GenerateBill.objects.all()
#     serializer_class = ListGenerateBillSerializer



