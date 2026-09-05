export function prepareBlocks(categories) {
  return flatCategory([], categories).reduce(
    (blocks, { name, breadcrumbs, block }) => ({
      ...blocks,
      [name]: { ...block, breadcrumbs },
    }),
    {},
  );
}

function flatCategory(breadcrumbs, obj, objName) {
  if (!obj.isCategory)
    return [
      {
        breadcrumbs,
        name: [...breadcrumbs, objName].join("-"),
        block: obj,
      },
    ];

  return Object.keys(obj)
    .map((name) =>
      !["isCategory", "label"].includes(name)
        ? flatCategory(
          objName ? [...breadcrumbs, objName] : breadcrumbs,
          obj[name],
          name,
        )
        : null,
    )
    .filter((value) => !!value)
    .flat();
}
