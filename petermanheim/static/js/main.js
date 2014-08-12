var activeTab = 'news';

sizeSlider();

$('#tabs span').click(function() {
    var tab = $(this).attr('id');
    sizeSlider();
    if (activeTab == tab) $('#slider').slideToggle();
    else {
        if ($('#slider').is(':visible')) $('#slider').slideToggle('medium', function() { changeTab(tab); });
        else {
            changeTab(tab);
        }
    }
});

function changeTab(tab) {
    $('#slider .tab').each(function() {
       $(this).hide();
    });
    if (tab == 'about') $('#slider').css('width', '600px');
    else $('#slider').css('width', '500px');
    $('#' + tab + 'Tab').show();
    $('#slider').slideToggle();
    activeTab = tab;
}

$(document).ready(function() {
    var d = new Date();
    $('#upcoming-gigs .gig').each(function() {
        if ($(this).data('date') < d.getTime() / 1000) {
            $(this).detach().appendTo('#past-gigs');
        }
    });
});

function sizeSlider() {
    $('#slider').css('max-height',$('#bl').offset().top - $('#slider-container').offset().top - 40);
    //if ($(window).height() < 665) $('#slider').css('max-height', 100);
    //else $('#slider').css('max-height', 325);
}

$(window).on('resize', function() {
    sizeSlider();
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46205021-1', 'petermanheim.com');
ga('send', 'pageview');
