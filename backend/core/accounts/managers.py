from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, phone_number=None, email=None, full_name=None, password=None):
        if not phone_number and email:
            user = self.model(
                phone_number=None,
                email=self.normalize_email(email),
                full_name=full_name,
                password=password,
            )
            user.set_password(password)
            user.save(using=self._db)
            return user
        elif phone_number and not email:
            user = self.model(
                phone_number=phone_number,
                email=None,
                full_name=full_name,
                password=password,
            )
            user.set_password(password)
            user.save(using=self._db)
            return user
        elif phone_number and email:
            user = self.model(
                phone_number=phone_number,
                email=self.normalize_email(email),
                full_name=full_name,
                password=password,
            )
            user.set_password(password)
            user.save(using=self._db)
            return user
        else:
            raise ValueError("user must have at least one of the two options")

    def create_superuser(self, phone_number, email, full_name, password):
        user = self.create_user(phone_number, email, full_name, password)
        user.is_admin = True
        user.save(using=self._db)
        return user
