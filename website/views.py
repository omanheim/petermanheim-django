from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
import random
import calendar

from website.models import *
import json

def index(request):
    gigs = Gig.objects.all()
    for gig in gigs:
        format = '%Y-%m-%d %H:%M:%S'
        gig.date = datetime.strptime(str(gig.date), format)
        gig.epoch = calendar.timegm(gig.date.utctimetuple())
        timeCheck = datetime.strftime(gig.date, '%I:%M:%S')
        if timeCheck == '12:34:56':
            gig.date = datetime.strftime(gig.date, '%m/%d').lstrip('0')
        else:
            m = datetime.strftime(gig.date, '%m').lstrip('0')
            d = datetime.strftime(gig.date, '%d').lstrip('0')
            tm = datetime.strftime(gig.date, '%I:%M %p').lstrip('0')
            gig.date = m + '/' + d + ' | ' + tm
    rand = random.randint(1,2)
    gigs = sorted(gigs, key=lambda gig: gig.epoch)
    backgroundImage = "/static/images/whitet.jpg" if rand == 1 else "/static/images/noblur.jpg"
    news = News.objects.all()[:1].news
    return render(request, 'homepage.html', {'gigs': gigs, 'bgimg': backgroundImage, 'news': news})

def gigs(request):
    gigs = Gig.objects.all()
    for gig in gigs:
        format = '%Y-%m-%d %H:%M:%S'
        gig.date = datetime.strptime(str(gig.date), format)
        gig.epoch = calendar.timegm(gig.date.utctimetuple())
        timeCheck = datetime.strftime(gig.date, '%I:%M:%S')
        if timeCheck == '12:34:56':
            gig.date = datetime.strftime(gig.date, '%b %d')
        else:
            gig.date = datetime.strftime(gig.date, '%b %d,  %I:%M %p')
    news = News.objects.all()[:1].news
    return render(request, 'gigs.html', {'gigs': gigs, 'news': news})

def addGig(request):
    venue = request.POST['venue']
    if request.POST['website']:
        if 'http://' not in request.POST['website']:
            website = 'http://' + request.POST['website']
        else:
            website = request.POST['website']
    else:
        website = ''
    date = str(request.POST['date'])
    time = str(request.POST['time']) + ':00'  if request.POST['time'] else '12:34:56'
    location = request.POST['location']
    group = request.POST['group']
    date_time = str(date) + ' ' + str(time)
    gig = Gig(venue=venue, website=website, date=date_time, location=location, band=group)
    gig.save()
    gigResponse = {'id': gig.id,
                   'venue': venue,
                   'website': website,
                   'location': location,
                   'group': group}
    format = '%Y-%m-%d %H:%M:%S'
    dateobj = datetime.strptime(str(gig.date), format)
    if time == '12:34:56':
        gigResponse['date'] = datetime.strftime(dateobj, '%b %d')
    else:
        gigResponse['date'] = datetime.strftime(dateobj,'%b %d,  %I:%M %p')
    gigResponse['epoch'] = calendar.timegm(dateobj.utctimetuple())
    return HttpResponse(json.dumps(gigResponse))

def removeGig(request):
    id = request.POST['id']
    gig = Gig.objects.get(pk=id).delete()
    return HttpResponse()

def saveNews(request):
    news = News.objects.get(pk=1)
    news.news = request.POST['news']
    news.save()
    return HttpResponse()

def signin(request):
    password = request.POST['password']
    if password == 'harrison':
        return HttpResponse(1)
    else:
        return HttpResponse(0)
