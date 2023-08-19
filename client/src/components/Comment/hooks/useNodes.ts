const useNode = () => {
    const insertNode = function (tree: any, commentId: number, item: string) {
      if (tree.id === commentId) {
        tree.items.push({
          id: new Date().getTime(),
          name: item,
          items: [],
        });
  
        return tree;
      }
  
      let latestNode: any[] = [];
      latestNode = tree.items.map((ob: any) => {
        return insertNode(ob, commentId, item);
      });
  
      return { ...tree, items: latestNode };
    };
  
    const editNode = (tree: any, commentId: number, value: string) => {
      if (tree.id === commentId) {
        tree.name = value;
        return tree;
      }
  
      tree.items.map((ob: any) => {
        return editNode(ob, commentId, value);
      });
  
      return { ...tree };
    };
  
    const deleteNode = (tree: any, id: number) => {
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem.id === id) {
          tree.items.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, id);
        }
      }
      return tree;
    };
  
    return { insertNode, editNode, deleteNode };
  };
  
  export default useNode;