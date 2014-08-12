from django.conf.urls import patterns, url

from website import views

urlpatterns = patterns('',

    url(r'^$', views.index, name='index'),
    url(r'^gigs$', views.gigs, name='gigs'),
    url(r'^addGig$', views.addGig, name='addGig'),
    url(r'^removeGig$', views.removeGig, name='removeGig'),
    url(r'^saveNews$', views.saveNews, name='saveNews'),
    url(r'^newNews$', views.newNews, name='newNews'),
    url(r'^signin$', views.signin, name='signin'),
    #url(r'^.*', views.view404, name='404'),
)
