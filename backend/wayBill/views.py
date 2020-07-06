from django.shortcuts import render

from rest_framework import generics, filters, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
# from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters

from .models import Bill, Contracts, Customer, GenerateBill
from .serializers import BillSerializer, BillIdsSerializer,\
                            ContractSerializer, CustomerSerializer,\
                            CustomerNameSerializer, GenerateBillSerializer, \
                            ListGenerateBillSerializer 
from .filters import BillFilter, BillIdsFilter, ContractFilter, \
                        CustomerFilter, GenerateBillFilter


class BillList(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    filter_backends = ( filters.DjangoFilterBackend, SearchFilter )
    filterset_class = BillFilter
    # filterset_fields = ['origin', 'consignee']


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



# # remove it
# class AllGenerateBillList(generics.RetrieveAPIView):
#     queryset = GenerateBill.objects.all()
#     serializer_class = ListGenerateBillSerializer


