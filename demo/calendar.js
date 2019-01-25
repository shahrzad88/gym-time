      

$(document).ready(function() {
    // page is ready
    // enable bootstrap popover
    $(function () {
        $('[data-toggle="popover"]').popover();
    });
    
    // Reset the calendar // Delete All Data
    $(document).on('click', '#reset', function() {
        $.ajax({
            'type': 'GET',
            'url': 'http://localhost:8080/reset',
            'dataType': 'JSON',
            'timeout': 5000,
            'success': function (data) {
                console.log("Resetting events to defaults");
            },
            'error': function(data) {
                console.log("Failed to write appointment data to server. Server returned " + JSON.parse(data) );
            }
        });
        console.log("Loading calendar");

    });
    
    // Initialize fullcalendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: new Date(),
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events

        // Click on a day to generate the popover
        dayClick: function(date, jsEvent, view) {
           $(this).popover({
                html: true,
                placement: 'top',
                container: 'body',
                editable: true,
                selectable: true,
                // create the popover
                title: function() {
                    return $('#popover-head').html();
                },
                content: function() {
                    $('#popover-content').find('#beginDate').attr('value', date.format("YYYY-MM-DD"));
                    $('#popover-content').find('#endDate').attr('value', date.format("YYYY-MM-DD"));
                    return $('#popover-content').html();
                }
            });
            $(this).popover('toggle');
        },
        
        // Render the event (appointment) to the fullcalendar
        eventRender: function(event, element, view) {
            return element.html(event.start.format("hh:mm a").toUpperCase()
                + "-" + event.end.format("hh:mm a").toUpperCase()
                + ': ' + event.title);
        }
    }); // full calendar initialized

   
    
    
    // Read all appointments from server
    $.ajax({
        'type': 'GET',
        'url': 'http://localhost:8080/read',
        'dataType': 'JSON',
        'timeout': 5000,
        'success': function (data) {
            console.log("Rendering events read from server: ");
            for (var i = 0; i < data.length; ++i) {
                console.log(JSON.stringify(data[i]));
                $('#calendar').fullCalendar('renderEvent', JSON.parse(data[i].event), true);
            }
        },
        'error': function(data) {
            console.log("Failed to write appointment data to server. Server returned " + JSON.parse(data) );
        }
    });
    console.log("Loading calendar");

    
    // Create the event (appointment), call fullCalendar to render it, and send it to the server.
    $(document).on('submit', '#calendar-form', function(e) {
        e.preventDefault(); // prevent refresh on submit
        var description = $(this).find("#description").val();
        var beginDateTime = $(this).find("#beginDate").val() + " " + $(this).find("#beginTime").val();
        var endDateTime = $(this).find("#endDate").val() + " " + $(this).find("#endTime").val();
        var beginDateTimeFromEpoch = $.fullCalendar.moment(beginDateTime, 'YYYY-MM-DD hh:mm a').valueOf();
        var endDateTimeFromEpoch = $.fullCalendar.moment(endDateTime, 'YYYY-MM-DD hh:mm a').valueOf();
        var currentDateTime = new moment().valueOf();


        var event = {
            title: description,
            start: $.fullCalendar.moment.utc(beginDateTime, 'YYYY-MM-DD hh:mm a'),
            end: $.fullCalendar.moment.utc(endDateTime, 'YYYY-MM-DD hh:mm a'),
            allDay: false,
            editable: true,
            backgroundColor: 'grey'
        };
        // Do Ajax call.  Render event to calendar if call succeeds; else, raise an alert.
        $.ajax({
            'type': 'POST',
            'url': 'http://localhost:8080/create',
            'dataType': 'JSON',
            'data': {
                'hashkey': currentDateTime,
                'event': JSON.stringify(event)
            },
            'timeout': 5000,
            'success': function (event) {
                $('#calendar').fullCalendar('renderEvent', event, true);
                console.log("\nRendering event:\nDescription: " + description + "\nbeginDateTime: " + beginDateTime
                    + "\nendDateTime: " + endDateTime + "\nbeginDateTimeFromEpoch" + beginDateTimeFromEpoch
                    + "\nendDateTimeFromEpoch" + endDateTimeFromEpoch
                    + "\nstart: " + JSON.stringify(event.start) + "\nend: " + JSON.stringify(event.end));
            },
            'error': function(callbackEvent) {
                console.log("Failed to write appointment data to server. " + callbackEvent );
                }
        });
    });
});
