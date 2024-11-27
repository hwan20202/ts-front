import { useState } from "react";

class Selection {
  constructor({ id, value, isSelected = false }) {
    this.id = id;
    this.value = value;
    this.isSelected = isSelected;
  }
}

const checkSelection = (selections, selected) => {
  if (!selections.every((s) => s instanceof Selection)) {
    throw new Error("selections must be an array of Selection objects");
  }
  return selections.map(
    (selection) =>
      new Selection({
        ...selection,
        isSelected: selected.includes(selection.value),
      })
  );
};

const useSelect = ({ selectionList = [], initialSelected = [] }) => {
  const [selections, setSelections] = useState(
    checkSelection(
      selectionList.map((s, index) => new Selection({ id: index, value: s })),
      initialSelected
    )
  );

  const replace = (newSelection) => {
    if (!(newSelection instanceof Selection)) {
      throw new Error("newSelection must be a Selection object");
    }
    setSelections([newSelection]);
  };

  const add = (newSelection) => {
    if (!(newSelection instanceof Selection)) {
      throw new Error("newSelection must be a Selection object");
    }
    setSelections(
      selections.map((s) =>
        s.id === newSelection.id ? new Selection({ ...s, isSelected: true }) : s
      )
    );
  };

  const remove = (newSelection) => {
    if (!(newSelection instanceof Selection)) {
      throw new Error("newSelection must be a Selection object");
    }
    setSelections(
      selections.map((s) =>
        s.id === newSelection.id
          ? new Selection({ ...s, isSelected: false })
          : s
      )
    );
  };

  const toggle = (selection) => {
    console.log(selection);
    if (!(selection instanceof Selection)) {
      throw new Error("selection must be a Selection object");
    }
    setSelections(
      selections.map((s) =>
        s.id === selection.id
          ? new Selection({ ...s, isSelected: !s.isSelected })
          : s
      )
    );
  };

  return { selections, setSelections, replace, add, remove, toggle };
};

export default useSelect;
