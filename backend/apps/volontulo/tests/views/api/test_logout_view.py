# -*- coding: utf-8 -*-

"""
.. module:: test_login_view
"""

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase

from apps.volontulo.factories import UserFactory

ENDPOINT_URL = reverse('api_logout')


class TestLogoutView(APITestCase, TestCase):

    def test_logout(self):
        user = self.client.force_login(UserFactory())
        res = self.client.post(ENDPOINT_URL, {user}, format='json')
        self.assertEqual(res.status_code, 200)
