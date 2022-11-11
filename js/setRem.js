var fun = function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = () => {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //这里是假设在750px宽度设计稿的情况下，1rem = 100px；
            docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
            doc.body.style.fontSize = 100 * (clientWidth / 375) + 'px'
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
fun(document, window)