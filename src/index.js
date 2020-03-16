// import { doc } from "prettier";
import Controller from "./components/Controller";
import Model from "./components/Model";
import View from "./components/View";

const controller = new Controller(
  new View(document.getElementById("root")),
  new Model([
    { text: "item1", id: 1 },
    { text: "item2", id: 2 },
    { text: "item3", id: 3 }
  ])
);

controller.renderList();
