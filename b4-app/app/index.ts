import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
// @ts-ignore
import * as templates from './templates.ts'
document.body.innerHTML=templates.main;
const mainElement = document.body.querySelector('.b4-main');

const alertsElement = document.body.querySelector('.b4-alerts');
mainElement.innerHTML=templates.welcome;
alertsElement.innerHTML=templates.alert