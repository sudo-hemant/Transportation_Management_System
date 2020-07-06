# Generated by Django 3.0.6 on 2020-06-23 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wayBill', '0013_auto_20200623_1807'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generatebill',
            name='total_amount',
            field=models.DecimalField(decimal_places=2, default=10, max_digits=8),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='generatebill',
            name='total_weight',
            field=models.DecimalField(decimal_places=2, default=20, max_digits=8),
            preserve_default=False,
        ),
    ]