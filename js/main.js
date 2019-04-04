/* *fix* the skiplink, see also: https://axesslab.com/skip-links/*/
document.getElementById('skiplink').addEventListener('click', function(e) {
    var target = document.querySelectorAll('h1, h2, h3, h4, h5, h6')[0];
    target.setAttribute('tabindex', "-1");
    target.focus();

    e.preventDefault();
});