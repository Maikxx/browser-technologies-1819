// tslint:disable
if (lastIndexOfExists()) {
    var socket = io();
}
else if (getElementsByTagNameExists() && appendChildExists()) {
    var metaRefreshTag = document.createElement('meta');
    var headElement = document.body.getElementsByTagName('head')[0];
    metaRefreshTag.httpEquiv = 'refresh';
    metaRefreshTag.content = '5';
    if (headElement) {
        headElement.appendChild(metaRefreshTag);
    }
}
