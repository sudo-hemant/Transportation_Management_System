from rest_framework import serializers
# from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User

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


class GenerateBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenerateBill
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)



# -------------------------------------------------------------


# to help display existing customer in autocomplete
class CustomerNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'name', 'gst_type', 'gst_rate')


# TODO: THIS IS WRONG, I THINK BCOS THIS FEATURE I WANT IN GENERATE BILL BUT INSTEAD MADE IN TRANSACTION
# to display list of existing bill and filter
class BillIdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ('id', 'date', 'shipper', 'weight',
                  'weight_charges', 'other_charges', 'total_charges')


# to see each bill in detail
class ListGenerateBillSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(many=False)
    bill = BillSerializer(many=True)

    class Meta:
        model = GenerateBill
        fields = '__all__'


# class TestingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Customer
#         fields = ( 'id', 'name', 'gst_rate' )
