from django.db import models
from datetime import date


class Bill(models.Model):

    e_way_bill_no = models.IntegerField(unique=True)
    date = models.DateField( default=date.today() )
    origin = models.CharField( max_length=20 )
    destination = models.CharField( max_length=20 )
    shipper = models.CharField(max_length=50)
    consignee = models.CharField(max_length=50)

    mode = models.CharField(max_length=50, blank=True)
    flight_no = models.CharField(max_length=50, blank=True)
    pieces = models.IntegerField()
    actual_weight = models.DecimalField(max_digits=7, decimal_places=2)
    payment_mode = models.CharField( max_length=50, blank=True )

    rate_per_kg = models.DecimalField(max_digits=6, decimal_places=3)
    declared_value = models.IntegerField(blank=True, default=0)
    weight_charges = models.IntegerField()
    other_charges = models.IntegerField(blank=True, default=0)
    igst = models.IntegerField(blank=True, default=0)
    cgst = models.IntegerField(blank=True, default=0)
    sgst = models.IntegerField(blank=True, default=0)
    total_charges = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return str(self.e_way_bill_no)


class Customer(models.Model):

    name = models.TextField(max_length=30)
    code = models.TextField(max_length=10, unique=True)
    contract_no = models.IntegerField(unique=True)
    contract_date = models.DateField(default=date.today())
    attendant = models.TextField(max_length=30)
    address = models.TextField(max_length=100)
    city = models.TextField(max_length=20)
    pin_code = models.IntegerField()
    state = models.TextField(max_length=10)
    country = models.TextField(max_length=30)
    e_mail = models.EmailField(unique=True)
    mobile_no = models.IntegerField()
    phone_1 = models.IntegerField(blank=True, null=True)
    phone_2 = models.IntegerField(blank=True, null=True)
    gst_no = models.TextField(max_length=30, unique=True)
    gst_type = models.TextField(max_length=20)
    pan_no = models.TextField(max_length=20, unique=True)
    payment_type = models.TextField(max_length=20)

    def __str__(self):
        return self.name


class Contracts(models.Model):

    origin = models.TextField(max_length=20)
    destination = models.TextField(max_length=20)
    rate = models.DecimalField(max_digits=5, decimal_places=2)
    extra_charges = models.DecimalField(max_digits=7, decimal_places=3)
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)

    def __str__(self):
        return self.destination


class GenerateBill(models.Model):

    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    generate_bill_no = models.PositiveIntegerField(primary_key=True, unique=True)
    bill = models.ManyToManyField(Bill)