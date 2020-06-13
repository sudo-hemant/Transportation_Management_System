from rest_framework import serializers

from .models import Bill, Contracts, Customer, GenerateBill


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'


class BillIdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ( 'id', 'date', 'shipper', 'actual_weight', 'total_charges' )


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contracts
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class CustomerNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer 
        fields = ( 'id', 'name' )


class GenerateBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenerateBill
        fields = '__all__'


class ListGenerateBillSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(many=False)
    bill = BillSerializer(many=True)
    class Meta:
        model = GenerateBill
        fields =  '__all__' 
