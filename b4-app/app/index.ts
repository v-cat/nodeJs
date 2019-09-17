import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
// @ts-ignore
import * as templates from './templates.ts'
document.body.innerHTML = templates.main({});
const mainElement = document.body.querySelector('.b4-main');
const alertsElement = document.body.querySelector('.b4-alerts');

// mainElement.innerHTML=templates.welcome();
// alertsElement.innerHTML=templates.alert({
//     type:'info',
//     message:'Handlebars is working!!'
// })
const showView = async () => {
    const [view, ...params] = window.location.hash.split('/');
    switch (view) {
        case "#welcome":
            mainElement.innerHTML = templates.welcome({});
            break;
        default:
            throw Error(`unrecognized view: ${view}`)
    }
}
window.addEventListener('hashchange',showView)
showView().catch(err=>(window.location.hash="#welcome"))