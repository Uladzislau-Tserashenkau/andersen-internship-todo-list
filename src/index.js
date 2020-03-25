// import { doc } from "prettier";
import Controller from './js/components/App/Controller';
import Model from './js/components/App/Model';
import View from './js/components/App/View';
import './index.css';

const controller = new Controller(
  new View(document.getElementById('root')),
  new Model(),
);

controller.renderList();
