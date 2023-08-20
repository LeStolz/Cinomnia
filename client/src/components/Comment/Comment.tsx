  import { useState } from "react";
  import CommentChild from "./components/CommentChild";
  import useNode from "./hooks/useNodes";
  import "./Comment.scss";

  interface CommentItem {
    id: number;
    name: string;
    items: CommentItem[];
  }

  interface CommentData {
    id: number;
    name: string;
    items: CommentItem[];
  }

  const comments: CommentData = {
    id: 1,
    name: "Root Comment",
    items: [
      {
        id: 1231321313,
        name: "hello world",
        items: [
          {
            id: 2131321,
            name: "hello world2",
            items: [],
          },
        ],
      },
      {
        id: 12313213,
        name: "hello world3",
        items: [
          {
            id: 21312313321,
            name: "hello world4",
            items: [],
          },
        ],
      },
    ],
  };

  export function Comment() {
    const [commentsData, setCommentsData] = useState<CommentData>(comments);

    const { insertNode, editNode, deleteNode } = useNode();

    const handleInsertNode = (folderId: number, item: any) => {
      const finalStructure = insertNode(commentsData, folderId, item);
      setCommentsData(finalStructure);
    };

    const handleEditNode = (folderId: number, value: any) => {
      const finalStructure = editNode(commentsData, folderId, value);
      setCommentsData(finalStructure);
    };

    const handleDeleteNode = (folderId: number) => {
      const finalStructure = deleteNode(commentsData, folderId);
      setCommentsData(finalStructure);
    };

    return (
      <div className="Comment">
        <CommentChild
          handleInsertNode={handleInsertNode}
          handleEditNode={handleEditNode}
          handleDeleteNode={handleDeleteNode}
          comment={commentsData}
        />
      </div>
    );
  }
