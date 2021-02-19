const utm = {
    "utm_source": "источник кампании",
    "utm_medium": "тип трафика",
    "utm_campaign": "название кампании",
    "utm_content": "идентификатор объявления",
    "utm_term": "ключевое слово"
}

document.querySelector('.get-data').addEventListener('click', () => {
    let searchString = '';
    let s = document.querySelector('.utm').value;
    const url = new URL(s);
    // console.log(url);
    // console.log(url.search);

    let out = '';
    out += `<p>Host: ${url.host}`;

    if (url.search.indexOf('&') !== -1) {
        searchString = url.search.slice(1).split('&');
    }
    else {
        searchString = url.search.slice(1).split('&amp;');
    }
    // console.log(searchString);
    const res = searchStringToObj(searchString);
    console.log(res);
    for (let key in res) {
        if (utm[key]) {
            out += `<p>${utm[key]} : ${decodeURI(res[key])}</p>`;
        }
        else {
            out += `<p>${key} : ${decodeURI(res[key])}</p>`;
        }
    }
    document.querySelector('.out').innerHTML = out;
});

function searchStringToObj(s) {
    return s.reduce((accum, item) => {
        item = item.split('=');
        // console.log(item);
        accum[item[0]] = item[1];
        return accum;
    }, {});
}
