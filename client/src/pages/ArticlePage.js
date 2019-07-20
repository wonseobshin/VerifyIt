import React from "react";

const ArticlePage = ({ match }) => {
  const id = match.params.id;
  return (
    <>
      <h1>This is the {id} Article Page</h1>
    </>
  );
};

export default ArticlePage;
