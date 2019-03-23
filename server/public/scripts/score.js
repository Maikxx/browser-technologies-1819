// tslint:disable:no-var-keyword
// tslint:disable:prefer-template
// tslint:disable:prefer-const
if (lastIndexOfExists()) {
    var socket = io();
}
else {
    var metaRefreshTag = document.createElement('meta');
    metaRefreshTag.httpEquiv = 'refresh';
    metaRefreshTag.content = '5';
}
