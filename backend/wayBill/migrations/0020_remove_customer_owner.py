# Generated by Django 3.1 on 2020-08-27 06:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wayBill', '0019_auto_20200827_0554'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='owner',
        ),
    ]
