# Generated by Django 3.0.6 on 2020-06-18 16:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wayBill', '0008_auto_20200618_1651'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bill',
            old_name='e_way_bill_no',
            new_name='doc_no',
        ),
    ]
