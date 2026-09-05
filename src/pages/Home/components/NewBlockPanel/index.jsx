import Panel from "../Panel";

import blocksModel from "../../models/BlocksModel";
import { blocks, categories } from "../../data/blocks/index";
import Category from "./Category";

import './style.scss'

export default function NewBlockPanel({ }) {
  return (
    <Panel className="new-block-panel" label="Добавление блока">
      <div className="blocks-list">
        <Category category={categories}/>
      </div>
    </Panel>
  );
}
