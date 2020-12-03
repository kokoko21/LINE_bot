
//チャンネルアクセストークン（ロングターム）
var access_token = '******************************************';
//ユーザーID（コンソールにログインしているLINEアカウントのユーザーID）
var userID = '************************';
var url = "https://api.line.me/v2/bot/message/push";

function get_calendar(event_push) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var calendar_ID1 = "**********@gmail.com";
    var calendar_ID2 = "********************@group.calendar.google.com";
    var calendar_get1 = CalendarApp.getCalendarById(calendar_ID1);
    var calendar_get2 = CalendarApp.getCalendarById(calendar_ID2);
    var events1 = calendar_get1.getEventsForDay(tomorrow);
    var events2 = calendar_get2.getEventsForDay(tomorrow);
    var event_push = [];
    for (var i in events1) {
        var event1 = events1[i].getTitle();
        event_push.push(event1);
    }
    for (var j in events2) {
        var event2 = events2[j].getTitle();
        event_push.push(event2);
    }
    return event_push;
}

function push_test() {
    var event_push = get_calendar();
    var event_message = "";
    event_message = "明日の予定は、";
    if (!event_push.length) {  //←空白判定
        event_message += "特にありません。";
    } else {
        for (var k = 0; k < event_push.length; k++) {
            event_message += event_push[k];
            if (k + 1 < event_push.length) {
                event_message += "、";
            }
        }
        event_message += "です。";
    }

    var headers = {
        "Content-Type": "application/json; charset = UTF-8",
        'Authorization': 'Bearer ' + access_token
    }
    var options = {
        'headers': headers,
        'method': 'post',
        "payload": JSON.stringify({
            "to": userID,
            "messages": [{
                "type": "text",
                "text": event_message
            }]
        })
    };

    UrlFetchApp.fetch(url, options);
}