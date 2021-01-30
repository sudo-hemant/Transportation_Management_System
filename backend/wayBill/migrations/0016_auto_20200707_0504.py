# Generated by Django 3.0.6 on 2020-07-07 05:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wayBill', '0015_auto_20200706_1455'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='gst_rate',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatebill',
            name='cgst',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatebill',
            name='igst',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatebill',
            name='sgst',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='bill',
            name='date',
            field=models.DateField(default=datetime.date(2020, 7, 7)),
        ),
        migrations.AlterField(
            model_name='customer',
            name='contract_date',
            field=models.DateField(default=datetime.date(2020, 7, 7)),
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='bill_date',
            field=models.DateField(default=datetime.date(2020, 7, 7)),
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='date_from',
            field=models.DateField(default=datetime.date(2020, 7, 7)),
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='date_to',
            field=models.DateField(default=datetime.date(2020, 7, 7)),
        ),
    ]
