# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-11-14 17:12
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('volontulo', '0017_remove_offer_recruitment_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='offer',
            name='finished_at',
        ),
        migrations.RemoveField(
            model_name='offer',
            name='started_at',
        ),
    ]
