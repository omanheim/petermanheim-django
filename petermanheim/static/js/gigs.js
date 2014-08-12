$(document).on('click', '#submit', function() {
    $.post('/signin', {'password': $('input[name=password]').val()}, function(response) {
        if (response == 1) {
            $('#signin').hide();
            $('#view-gigs').show();
        } else {
            $('input[name=password]').val('');
            $('#error').show();
        }
    });
    return false;
});

$(document).on('click', '#add', function() {
    $('#view-gigs').hide();
    $('#add-gig').show();
});

$(document).on('click', '#edit-news-btn', function() {
  $('#view-gigs').hide();
  $('#edit-news').show();
});

$(document).on('click', '#save-news', function() {
  $.post('/saveNews', {'news': document.getElementById('news-content').innerText}, function() {
    $('#edit-news').hide();
    $('#view-gigs').show();
  });
});

$(document).on('click', '.remove-gig', function() {
    var id = $(this).closest('tr').data('id');
    $.post('/removeGig', {'id': id}, function() {
        $('tr[data-id='+id+']').detach();
    });
});

$(document).on('click', '#submit-gig', function() {
    var retry = false;
    $('.required').each(function() {
        if (!$(this).val()) {
            $(this).closest('td').css('background-color','red');
            retry = true;
        } else {
            $(this).closest('td').css('background-color','rgb(255,229,208)');
        }
    });
    if (retry) return false;
    var data = {};
    data.venue = $('#venue').val();
    data.website = $('#website').val();
    data.date = $('#date').val();
    data.time = $('#time').val();
    data.location = $('#location').val();
    data.group = $('#group').val();
    $.post('/addGig', data, function(gigjson) {
        gig = $.parseJSON(gigjson);
        var gigline = '<tr data-id=' + gig.id + '><td>' +  gig.venue + '</td><td class="gig-time" data-epoch=' + gig.epoch  + '>' + gig.date + '</td><td>' + gig.location + '</td><td>' + gig.group + '</td><td class="remove-gig"><b>X</b></td>';
        $('#gig-table').append(gigline);
        $('#no-gigs').hide();
        sortGigs();
        $('#add-gig').hide();
        $('#view-gigs').show();
    });
});

function sortGigs() {
    var compareTimes = function(a,b) {
        return $(b).find('td.gig-time').data('epoch') - $(a).find('td.gig-time').data('epoch');
    };
    $('#gig-table tr').not('.headers').sort(compareTimes).appendTo('#gig-table');
    var now = Math.round($.now() / 1000);
    $('#gig-table tr').not('.headers').each(function() {
        var gigtime = $(this).find('td.gig-time').data('epoch');
        if (gigtime > now) $(this).css('background-color','rgb(192,231,170)');
        else $(this).css('background-color', 'rgb(255,182,182)');
    });
}

$(document).ready(function() {
    sortGigs();
});
