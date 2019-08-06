const OPEN_MIN = 0.5;
const OPEN_MAX = 1.5;
const DIFFERENCE_MIN = -0.5;
const DIFFERENCE_MAX = 0.5;
const FLUCTUATION_MIN = -0.5;
const FLUCTUATION_MAX = 0.5;
const TIME_MIN = 1000 * 60 * 60 * 24;
const TIME_MAX = 1000 * 60 * 60 * 24;

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function formatDate(date) {
    var
        d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear()
    ;

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join('-');
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

function getDummyData(from, to, amount) {
    var dummyObject = {
        "Meta Data": {
            "1. Information": "Forex Monthly Prices (open, high, low, close)",
            "2. From Symbol": from,
            "3. To Symbol":  to,
            "4. Last Refreshed": formatDate(new Date()) + " 00:00:00",
            "5. Time Zone": "GMT+0"
        },
        "Time Series FX (Monthly)": {}
    };

    var lastValue = rand(OPEN_MIN, OPEN_MAX);
    var time = new Date().getTime();

    for (var i = 0; i < amount; i++) {
        var heightA = lastValue + rand(FLUCTUATION_MIN, FLUCTUATION_MAX), heightB = lastValue + rand(FLUCTUATION_MIN, FLUCTUATION_MAX);

        dummyObject["Time Series FX (Monthly)"][formatDate(new Date(time))] = {
            "1. open": lastValue,
            "2. high": Math.max(heightA, heightB),
            "3. low": Math.min(heightA, heightB),
            "4. close": lastValue + rand(FLUCTUATION_MIN, FLUCTUATION_MAX)
        };

        lastValue += rand(DIFFERENCE_MIN, DIFFERENCE_MAX);
        time += rand(TIME_MIN, TIME_MAX);
    }

    return dummyObject;
}

window.onload = function() {  
    if (getURLParameter("from") == null || getURLParameter("to") == null || getURLParameter("amount") == null) {
        document.getElementsByTagName("body")[0].innerHTML = `
            <pre>
_______  _______  _        _______  _______ _________ _______  _        _        _______ 
(  ____ \\(  ___  )| \\    /\\(  ____ \\(  ____ \\\\__   __/(  ___  )( (    /|| \\    /\\(  ____ \\
| (    \\/| (   ) ||  \\  / /| (    \\/| (    \\/   ) (   | (   ) ||  \\  ( ||  \\  / /| (    \\/
| (__    | (___) ||  (_/ / | (__    | (_____    | |   | |   | ||   \\ | ||  (_/ / | (_____ 
|  __)   |  ___  ||   _ (  |  __)   (_____  )   | |   | |   | || (\\ \\) ||   _ (  (_____  )
| (      | (   ) ||  ( \\ \\ | (            ) |   | |   | |   | || | \\   ||  ( \\ \\       ) |
| )      | )   ( ||  /  \\ \\| (____/\\/\\____) |   | |   | (___) || )  \\  ||  /  \\ \\/\\____) |
|/       |/     \\||_/    \\/(_______/\\_______)   )_(   (_______)|/    )_)|_/    \\/\\_______)
                                                                                            
            </pre>

            Welcome to this totally accurate representation of the stock markets of today!<br>
            To use this newfangled service, just append to this very URL with the following:<br>
            <br>
            ?from=GBP&to=EUR&amount=20<br>
            <br>
            The example above will show stock data with forex going from GBP to EUR with the next 20 days.<br>
            <br>
            If you're lazy, <a href="?from=GBP&to=EUR&amount=20">just use the demo</a>!<br>
            <br>
            <pre>
    "I have no idea how the stock market works"
      -James
            </pre>
        `;
    } else {
        document.getElementsByTagName("body")[0].innerHTML = JSON.stringify(getDummyData(getURLParameter("from"), getURLParameter("to"), Number(getURLParameter("amount"))));
    }
};