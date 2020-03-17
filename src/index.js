// import { doc } from "prettier";
import Controller from './js/Controller';
import Model from './js/Model';
import View from './js/View';
import './index.css';

const controller = new Controller(
  new View(document.getElementById('root')),
  new Model([
    { text: 'item1', id: 1 },
    { text: 'item2', id: 2 },
    { text: 'item3', id: 3 },
  ]),
);

controller.renderList();
