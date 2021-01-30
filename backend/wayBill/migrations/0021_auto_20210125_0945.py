# Generated by Django 2.2.8 on 2021-01-25 09:45

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wayBill', '0020_remove_customer_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bill',
            name='owner',
        ),
        migrations.AlterField(
            model_name='bill',
            name='date',
            field=models.DateField(default=datetime.date(2021, 1, 25)),
        ),
        migrations.AlterField(
            model_name='customer',
            name='contract_date',
            field=models.DateField(default=datetime.date(2021, 1, 25)),
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='bill_date',
            field=models.DateField(default=datetime.date(2021, 1, 25)),
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='date_from',
            field=models.DateField(default=datetime.date(2021, 1, 25)),
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='date_to',
            field=models.DateField(default=datetime.date(2021, 1, 25)),
        ),
    ]
