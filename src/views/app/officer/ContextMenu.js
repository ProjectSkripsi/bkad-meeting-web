import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const ContextMenuContainer = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu id="menu_id" onShow={(e) => onContextMenu(e, e.detail.data)}>
      <MenuItem onClick={onContextMenuClick} data={{ action: "update" }}>
        <i className="simple-icon-note" /> <span>Edit</span>
      </MenuItem>
      <MenuItem onClick={onContextMenuClick} data={{ action: "change-pass" }}>
        <i className="iconsminds-key" /> <span>Ganti Password</span>
      </MenuItem>
      <hr />
      <MenuItem onClick={onContextMenuClick} data={{ action: "delete" }}>
        <i className="simple-icon-trash" /> <span>Hapus</span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainer;
