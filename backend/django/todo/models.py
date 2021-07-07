from django.db import models
from account.models import User


class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    is_checked = models.BooleanField(default=False)
    priority = models.IntegerField(default=0, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title
