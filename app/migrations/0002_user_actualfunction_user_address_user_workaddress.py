# Generated by Django 5.0.6 on 2024-05-28 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='actualFunction',
            field=models.CharField(default='Próspero', max_length=50),
        ),
        migrations.AddField(
            model_name='user',
            name='address',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='workAddress',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
