# Generated by Django 4.1.12 on 2023-10-30 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_userprofile_name_alter_user_cover_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='timestamp',
            field=models.DateTimeField(blank=True),
        ),
    ]