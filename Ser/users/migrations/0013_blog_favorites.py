# Generated by Django 4.1.12 on 2023-10-30 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='favorites',
            field=models.IntegerField(default=0),
        ),
    ]
