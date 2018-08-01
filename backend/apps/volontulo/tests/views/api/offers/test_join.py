# -*- coding: utf-8 -*-

"""
.. module:: test_join
"""

from rest_framework import status
from rest_framework.test import APITestCase

from apps.volontulo.tests.views.offers.commons import TestOffersCommons


class TestAuthenticatedUserJoinOffer(TestOffersCommons, APITestCase):

    """Tests for REST API's join offer view for authenticated user."""

    def setUp(self):
        """Set up each test."""
        super(TestAuthenticatedUserJoinOffer, self).setUp()
        self.client.login(username='admin@example.com', password='123admin')

    def test_user_join_offer_authenticated(self):
        """Test offer's delete status for admin user."""
        response = self.client.post('/api/offers/1/join/')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestNotAuthenticatedUserJoinOffer(TestOffersCommons, APITestCase):

    def test_user_join_offer_not_authenticated(self):
        """Test offer's delete status for not logged in user."""
        response = self.client.post('/api/offers/1/join/')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
