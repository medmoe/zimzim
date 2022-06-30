# Generated by Django 4.0.5 on 2022-06-30 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zemzem', '0002_alter_customer_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='username',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
