from rest_framework import serializers

from .models import Bill, Contracts, Customer, GenerateBill


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'


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
    bill = BillSerializer(many=True)
    class Meta:
        model = GenerateBill
        fields = ('generate_bill_no', 'bill', )