# Generated by Django 3.1 on 2020-08-27 05:54

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wayBill', '0018_auto_20200707_0909'),
    ]

    operations = [
        migrations.AddField(
            model_name='bill',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='doc', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='customer',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='customer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='bill',
            name='date',
            field=models.DateField(default=datetime.date(2020, 8, 27)),
        ),
        migrations.AlterField(
            model_name='customer',
            name='contract_date',
            field=models.DateField(default=datetime.date(2020, 8, 27)),
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='bill_date',
            field=models.DateField(default=datetime.date(2020, 8, 27)),
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='date_from',
            field=models.DateField(default=datetime.date(2020, 8, 27)),
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='date_to',
            field=models.DateField(default=datetime.date(2020, 8, 27)),
        ),
    ]
