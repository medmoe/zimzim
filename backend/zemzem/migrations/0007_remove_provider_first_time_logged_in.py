# Generated by Django 4.0.5 on 2022-07-02 23:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('zemzem', '0006_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='provider',
            name='first_time_logged_in',
        ),
    ]
