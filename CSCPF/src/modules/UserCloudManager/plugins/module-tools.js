const fmClearEmptyChildrenProperty = items => {
  items.forEach(item => {
    if (item.itemType === "file") {
      if (
        item.children === null ||
        item.children === undefined ||
        item.children.length === 0
      )
        delete item.children;
      else item.children = fmClearEmptyChildrenProperty(item.children);
    }
  });

  return items;
};

const fmDirectoryCalcCountFileAndSize = items => {
  items.forEach(item => {
    fmDirectoryCalcCountFileAndSizePerItem(item);
  });

  return items;
};

const fmDirectoryCalcCountFileAndSizePerItem = item => {
  item.directoryData.fileCount = 0;
  item.directoryData.size = 0;

  if (item.children) {
    item.children.forEach(childItem => {
      if (childItem.itemType === "file") {
        item.directoryData.fileCount++;
        item.directoryData.size += childItem.fileData.size;
      } else {
        fmDirectoryCalcCountFileAndSizePerItem(childItem);
        item.directoryData.fileCount += childItem.directoryData.fileCount;
        item.directoryData.size += childItem.directoryData.size;
      }
    });
  }
};

export default {
  fmClearEmptyChildrenProperty,
  fmDirectoryCalcCountFileAndSize
};
