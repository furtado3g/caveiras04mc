from django.contrib.auth.models import User as AuthUser
from django.db import models, connection


# Create your models here.
class User(models.Model):
    User = models.OneToOneField(AuthUser, on_delete=models.CASCADE)
    bloodType = models.CharField(max_length=2, blank=True, null=True)
    motorcycle = models.CharField(max_length=50, blank=True, null=True)
    partner = models.CharField(max_length=50, blank=True, null=True)
    godfather = models.CharField(max_length=50, blank=True, null=True)
    emergencyContact = models.CharField(max_length=50, blank=True, null=True)
    emergencyPhone = models.CharField(max_length=50, blank=True, null=True)
    formerMC = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    workAddress = models.CharField(max_length=50, blank=True, null=True)
    actualFunction = models.CharField(max_length=50, default='Próspero')

    def create_user(self, userData={}):
        ath = AuthUser.objects.find(email=userData['email'])
        if not ath:
            ath = AuthUser().objects.create(
                email=userData['email'],
                username=userData['username'],
                first_name=userData['first_name'],
                last_name=userData['last_name'],
                password=userData['password'],
            )
        usu = self.objects.get_or_create(
            User=ath,
            bloodType=userData['bloodType'],
            motorcycle=userData['motorcycle'],
            partner=userData['partner'],
            godfather=userData['godfather'],
            emergencyContact=userData['emergencyContact'],
            emergencyPhone=userData['emergencyPhone'],
            formerMC=userData['formerMC'],
            address=userData['address'],
            workAddress=userData['workAddress'],
            actualFunction=userData['actualFunction'],
        )
        return usu

    def get_user(id):
        cursor = connection.cursor()
        query = f"""select username,
                           first_name || ' ' || last_name as fullname,
                           email,
                           is_staff,
                           "bloodType",
                           motorcycle,
                           partner,
                           godfather,
                           "emergencyContact",
                           "emergencyPhone",
                           "formerMC",
                           "actualFunction",
                           address,
                           "workAddress"
                    from auth_user as ath
                             left join users as usu on ath.id = usu."User_id"
                    where ath.id = {id}"""
        cursor.execute(query)
        return cursor.fetchone()

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
