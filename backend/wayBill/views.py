from django.shortcuts import render

from rest_framework import generics, filters, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
# from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters

from .models import Bill, Contracts, Customer, GenerateBill
from .serializers import BillSerializer, ContractSerializer,\
                            CustomerSerializer, CustomerNameSerializer, \
                            GenerateBillSerializer, ListGenerateBillSerializer    
from .filters import BillFilter, ContractFilter, CustomerFilter 


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


class CustomerNameList(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerNameSerializer


class GenerateBillList(viewsets.ModelViewSet):
    queryset = GenerateBill.objects.all()
    serializer_class = GenerateBillSerializer


class AllGenerateBillList(generics.RetrieveAPIView):
    queryset = GenerateBill.objects.all()
    serializer_class = ListGenerateBillSerializer