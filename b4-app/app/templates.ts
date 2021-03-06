import * as Handlebars from 'handlebars'

export const main = Handlebars.compile(`
<div class="container">
<h1>B4-Book Bundler </h1>
<div class="b4-alerts"></div>
<div class="b4-main"></div>
<p>${new Date()} </p>
</div>
`);
export const welcome =Handlebars.compile( `
<div class="jumbotron">
<h1>
Welcome!
</h1>
<p> B4 is an application for creating book bundles.</p>
</div>
`);
export const alert = Handlebars.compile(`
<div class='alert alert-{{type}} alert-dismissible  in' role='alert'>
<button class='close' data-dismiss='alert' aria-label='Close >
<span aria-hidden='true' > &times;</span>
</button>
{{message}}
</div>
`)