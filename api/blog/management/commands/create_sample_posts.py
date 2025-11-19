from django.core.management.base import BaseCommand
from blog.models import BlogPost


class Command(BaseCommand):
    help = 'Create sample blog posts'

    def handle(self, *args, **options):
        sample_posts = [
            {
                'title': 'Getting Started with Django REST Framework',
                'content': 'Django REST Framework is a powerful and flexible toolkit for building Web APIs. In this post, we will explore the basics of creating a REST API with Django.',
                'author': 'John Doe',
            },
            {
                'title': 'Building Modern Web Applications with React',
                'content': 'React is a popular JavaScript library for building user interfaces. Learn how to create interactive and dynamic web applications using React components.',
                'author': 'Jane Smith',
            },
            {
                'title': 'Deploying Applications with Kubernetes',
                'content': 'Kubernetes is an open-source container orchestration platform. Discover how to deploy and manage containerized applications at scale using Kubernetes and Helm.',
                'author': 'Bob Johnson',
            },
        ]

        for post_data in sample_posts:
            BlogPost.objects.get_or_create(
                title=post_data['title'],
                defaults=post_data
            )
            self.stdout.write(
                self.style.SUCCESS(f'Created post: {post_data["title"]}')
            )
