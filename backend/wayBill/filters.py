import django_filters
from django_filters import FilterSet, CharFilter, NumberFilter, DateFromToRangeFilter

from .models import Bill, Contracts, Customer


class BillFilter(FilterSet):
    bill_no = NumberFilter(field_name='e_way_bill_no', lookup_expr="iexact")
    date = DateFromToRangeFilter(field_name="date")
    origin = CharFilter(field_name='origin', lookup_expr="icontains")
    destination = CharFilter(field_name='destination', lookup_expr="icontains")
    shipper = CharFilter(field_name='shipper', lookup_expr="icontains" ) # it defaults to exact lookup
    consignee = CharFilter(field_name="consignee", lookup_expr="icontains")

    class Meta:
        model = Bill
        fields = [ 'bill_no', 'date', 'origin', 'destination', 'shipper', 'consignee', ]


class ContractFilter(FilterSet):
    origin = CharFilter(field_name='origin', lookup_expr="icontains")
    destination = CharFilter(field_name='destination', lookup_expr="icontains")
    customer = NumberFilter(field_name='customer')

    class Meta:
        model = Contracts
        fields = [ 'origin', 'destination', 'customer', ]


class CustomerFilter(FilterSet):
    name = CharFilter(field_name='name', lookup_expr="icontains")
    code = CharFilter(field_name='code', lookup_expr="iexact")
    contract_no = NumberFilter(field_name='contract_no', lookup_expr="iexact")
    gst_no = CharFilter(field_name='gst_no', lookup_expr="iexact")
    pan_no = CharFilter(field_name='pan_no', lookup_expr="iexact")

    class Meta:
        model = Customer
        fields = [ 'name', 'code', 'contract_no', 'gst_no', 'pan_no' ]
