if (typeof ($.fn.modal) === 'undefined') {
  document.write('<script src="/bootstrap/bootstrap.min.js"><\/script>')
}

$(function () {
  if ($('#bootstrapCssTest').is(':visible')) {
    $("head").prepend('<link rel="stylesheet" href="/bootstrap/bootstrap.min.css">');
  }
});