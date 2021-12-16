# sHtml
HTML templating engine

## How to use
Basically, you can put variables in html.
In HTML5, to embed a variables write ~{nameofyourvariable}~.
In js to define this variable when calling x.render(path to html, {nameofyourvariable: 'Some value'});

So:

<p>Hi your name is, ~{name}~! You have visited this site ~{times_visited}~ times.</p>
&
x.render(index.html, {name: 'Jacob', times_visited: '2,301'})

will become:
<p>Hi your name is, Jacob! You have visited this site 2,301 times.</p>

This modified HTML will be sent to your browser, thus client-side rendering.
