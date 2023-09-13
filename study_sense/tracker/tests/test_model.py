"""
Unittest for Tracker Model
"""
from django.test import TestCase
from django.contrib.auth.models import User
from tracker.models import Category, Book, TimeTracking
from datetime import datetime, timedelta


class CategoryModelTestCase(TestCase):
    """category model test"""
    def setUp(self):
        """set up"""
        self.user = User.objects.create(username='testuser')
        self.category = Category.objects.create(
            name='Test Category',
            total_time=0,
            user=self.user
        )

    def test_category_name(self):
        """Test the name field of the Category model"""
        self.assertEqual(self.category.name, 'Test Category')

    def test_category_total_time(self):
        """Test the total_time field of the Category model"""
        self.assertEqual(self.category.total_time, 0)

    def test_category_user(self):
        """Test the user field of the Category model"""
        self.assertEqual(self.category.user, self.user)


class BookModelTestCase(TestCase):
    """Unittest class"""
    def setUp(self):
        """seting up tests"""
        self.user = User.objects.create(username='testuser')
        self.category = Category.objects.create(
            name='Test Category',
            total_time=0,
            user=self.user
        )
        self.book = Book.objects.create(
            name='Test Book',
            category=self.category,
            file='test.pdf',
            total_time=0,
            user=self.user
        )

    def test_book_name(self):
        """Test the name field of the Book model"""
        self.assertEqual(self.book.name, 'Test Book')

    def test_book_category(self):
        """Test the category field of the Book model"""
        self.assertEqual(self.book.category, self.category)

    def test_book_file(self):
        """Test the file field of the Book model"""
        self.assertEqual(self.book.file, 'test.pdf')

    def test_book_total_time(self):
        """Test the total_time field of the Book model"""
        self.assertEqual(self.book.total_time, 0)

    def test_book_user(self):
        """Test the user field of the Book model"""
        self.assertEqual(self.book.user, self.user)


class TimeTrackingModelTestCase(TestCase):
    """Unittest class"""
    def setUp(self):
        """seting up tests"""
        self.user = User.objects.create(username='testuser')
        self.category = Category.objects.create(
            name='Test Category',
            total_time=0,
            user=self.user
        )
        self.book = Book.objects.create(
            name='Test Book',
            category=self.category,
            file='test.pdf',
            total_time=0,
            user=self.user
        )
        self.start_time = datetime.now()
        self.end_time = self.start_time + timedelta(hours=1)
        self.time_tracking = TimeTracking.objects.create(
            user=self.user,
            book=self.book,
            start_time=self.start_time,
            end_time=self.end_time,
            total_time=timedelta(hours=1)
        )

    def test_time_tracking_user(self):
        """Test the user field of the TimeTracking model"""
        self.assertEqual(self.time_tracking.user, self.user)

    def test_time_tracking_book(self):
        """Test the book field of the TimeTracking model"""
        self.assertEqual(self.time_tracking.book, self.book)

    def test_time_tracking_start_time(self):
        """Test the start_time field of the TimeTracking model"""
        self.assertEqual(self.time_tracking.start_time, self.start_time)

    def test_time_tracking_end_time(self):
        """Test the end_time field of the TimeTracking model"""
        self.assertEqual(self.time_tracking.end_time, self.end_time)

    def test_time_tracking_total_time(self):
        """Test the total_time field of the TimeTracking model"""
        self.assertEqual(self.time_tracking.total_time, timedelta(hours=1))
