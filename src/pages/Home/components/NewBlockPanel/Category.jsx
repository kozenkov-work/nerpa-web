import { useSignal } from "@preact/signals";

import Block from "../Block";

export default function Category({ category }) {
  const isHidden = useSignal(category.label ? true : false);
  const childs = Object.keys(category)
    .map((name) => {
      if (["isCategory", "label", "name"].includes(name)) return;

      return {
        ...category[name],
        name: (category.name ? category.name + "-" : "") + name,
      };
    })
    .filter((child) => !!child);

  return (
    <div className="category">
      {category.label && (
        <div className="header" onClick={() => isHidden.value = !isHidden.value}>
          <div className="icon">{">"}</div>
          <div className="label">{category.label}</div>
        </div>
      )}
      <div className={`childs ${isHidden.value ? "hidden" : ""}`}>
        {childs.map((child) =>
          child.isCategory ? (
            <Category category={child} />
          ) : (
            <Block
              type={child.name}
              onClick={() => {
                blocksModel.create(child.name);
              }}
            ></Block>
          ),
        )}
      </div>
    </div>
  );
}
