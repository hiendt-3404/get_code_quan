import Pusher from "pusher-js";

$(document).ready(function () {
    var notificationsWrapper = $('.dropdown-notifications');
    var notificationsToggle = notificationsWrapper.find('a[data-toggle]');
    var notificationsCountElem = notificationsToggle.find('i[data-count]');
    var notificationsCount = parseInt(notificationsCountElem.data('count'));
    var notifications = notificationsWrapper.find('ul.dropdown-menu');

    var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        encrypted: true,
    });
    var channel = pusher.subscribe('channel-notification-' + window.user);

    channel.bind("notification-event", async function (data) {
        var existingNotifications = notifications.html();
        var newNotificationHtml = `
            <li class="notification2 unchecked">
                <a href="${data.urlPost}?idnotify=${data.notification_id}" data-id="${data.notification_id}" target="_blank">
                    <div class="media">
                        <div class="media-body">
                            <p >${data.message}</p>
                            <div class="notification-meta">
                              <small class="timestamp">${data.created_at}</small>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        `;

        notifications.html(newNotificationHtml + existingNotifications);
        notificationsCount++;
        notificationsCountElem.attr('data-count', notificationsCount);
        notificationsCountElem.text(notificationsCount);
        notificationsWrapper.find('.notif-count').text(notificationsCount);
        notificationsWrapper.show();
    });

    $(document).on('click', '#allRead', function (e) {
        e.preventDefault();
        let url = $('#allRead').attr('href');

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: "GET",
            url: url,
            success: function () {
                notificationsCount = 0;
                notificationsCountElem.attr('data-count', 0);
                notificationsCountElem.text(0);
                notificationsWrapper.find('.notif-count').text(0);
                $('.dropdown-menu2 li').each(function () {
                    $(this).removeClass('unchecked');
                });
            }
        });
    });

    $(document).on('click', '.notification2', function (e) {
        $(this).closest('li').removeClass('unchecked');

        notificationsCount--;
        notificationsCountElem.attr('data-count', notificationsCount);
        notificationsCountElem.text(notificationsCount);
        notificationsWrapper.find('.notif-count').text(notificationsCount);
    });
})
