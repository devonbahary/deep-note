import React from 'react';

const FolderItem = ({ children, index }) => {
  const folderItemStyle = { animationDelay: `${index * 0.05}s` };
  return (
    <div className="FolderItem" style={folderItemStyle}>
      {children}
    </div>
  );
}

export default FolderItem;