# -*- coding: utf-8 -*-

"""
.. module:: test_join
"""
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from apps.volontulo.tests.views.offers.commons import TestOffersCommons

from apps.volontulo.factories import UserFactory
from apps.volontulo.factories import OfferFactory


class TestAuthenticatedUserJoinOffer(TestOffersCommons, APITestCase):

    """Tests for REST API's join offer view for authenticated user."""
    @classmethod
    def setUpClass(cls):
        cls.user = UserFactory.create()
        cls.offer = OfferFactory.create()
        cls.offer.publish()

    @classmethod
    def tearDownClass(cls):
        cls.user.delete()
        cls.offer.organization.delete()
        cls.offer.delete()

    def setUp(self):
        """Set up each test."""
        super(TestAuthenticatedUserJoinOffer, self).setUp()
        self.client.force_login(self.user)

    def test_user_join_offer_authenticated(self):
        """Test offer's created status for user."""
        post = self.client.get('/api/offers/{}/'.format(self.offer.id))
        self.assertEqual(post.data['joined'], False)
        response = self.client.post(reverse('offer-join', kwargs={'pk': '1'}))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        post = self.client.get('/api/offers/1/')
        self.assertEqual(post.data['joined'], True)

    def test_user_join_not_existing_offer(self):
        """Test offer's 404 status for non existing offer."""
        response = self.client.post('/api/offers/1999999999999/join/')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TestNotAuthenticatedUserJoinOffer(TestOffersCommons, APITestCase):

    """Tests for REST API's join offer view for not authenitcated user"""

    def test_user_join_offer_not_authenticated(self):
        """Test offer's forbidden status for not logged in user."""
        response = self.client.post('/api/offers/1/join/')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
